import React, { useState, useEffect, useCallback } from "react";
import { ApiResponseProducts, Product, ProductOrder } from "../../types/types";
import axios from "axios";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    restaurantId: string;
    fetchOrders: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, restaurantId, fetchOrders }) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = useCallback(async () => {
        if (!restaurantId) return;

        try {
            const res = await axios.get<ApiResponseProducts>(
                `${API_URL}/api/restaurants/${restaurantId}/products`,
            );
            setProducts(res.data.products);
        } 
        catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [restaurantId]);

    useEffect(() => {
        if (!restaurantId) return;
        fetchProducts();
    }, [restaurantId, fetchProducts]);

    // Estado utilizado para hacer el POST de una orden
    const [productOrders, setProductOrders] = useState<ProductOrder[]>([]);

    useEffect(() => {
        // Creo un array con los productos y un campo quantity inicializado en cero
        const initialOrders = products.map((product) => ({
            ...product,
            quantity: 0,
        }));
        setProductOrders(initialOrders);
    }, [products]);

    // Seteo el incremento en mi array de productOrders creado
    const increment = (name: string) => {
        setProductOrders((prev) =>
            prev.map((product) =>
                product.name === name
                    ? { ...product, quantity: product.quantity + 1 }
                    : product,
            ),
        );
    };

    const decrement = (name: string) => {
        setProductOrders((prev) =>
            prev.map((product) =>
                product.name === name && product.quantity > 0
                    ? { ...product, quantity: product.quantity - 1 }
                    : product,
            ),
        );
    };

    const handleCreateOrder = async () => {
        // Me quedo con los elementos de la orden
        const selectedProducts = productOrders.filter((product) => product.quantity > 0);

        if (selectedProducts.length === 0) {
            alert("Please, select at least one product.");
            return;
        }

        const total = selectedProducts.reduce((acc, product) => {return acc + product.price * product.quantity}, 0);

        const orderData = {
            products: selectedProducts,
            total: total,
        };

        try {
            const response = await fetch(
                `${API_URL}/api/restaurants/${restaurantId}/orders`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                },
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Order created successfully:", data);

                // Seteo de nuevo quantity a cero
                setProductOrders((prev) =>
                    prev.map((product) => ({
                        ...product,
                        quantity: 0,
                    })),
                );

                fetchOrders(); // Fetcheo de nuevo las ordenes para cargar la nueva
                onClose(); // Cierro el modal
            } 
            else {
                const errorData = await response.json();
                console.error("Error creating the order:", errorData);
            }
        } 
        catch (error) {
            console.error("Error creating the order:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box relative w-[90%] max-w-[500px]">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose} >
                ✕
                </button>

                <h2 className="text-2xl font-bold mb-4">Products</h2>

                <div className="max-h-[400px] md:max-h-[500px] overflow-y-scroll scrollbar-hide">
                    {productOrders.length > 0 ? (
                        <ul>
                            {productOrders.map((product) => (
                                <li
                                    key={product.name}
                                    className="mb-4 flex justify-between items-center"
                                >
                                    <div>
                                        <span className="font-semibold">
                                            {product.name}
                                        </span>
                                        {" - "}${product.price.toFixed(2)}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            className="btn btn-sm bg-base-300 text-white hover:bg-base-400 rounded"
                                            onClick={() =>
                                                decrement(product.name)
                                            }
                                        >
                                            -
                                        </button>
                                        <div className="flex-1 text-center w-[16px]">
                                            {product.quantity}
                                        </div>
                                        <button
                                            className="btn btn-sm bg-base-300 text-white hover:bg-base-400 rounded"
                                            onClick={() =>
                                                increment(product.name)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>

                <div className="flex justify-end mt-4">
                    <button className="btn btn-primary" onClick={handleCreateOrder} >
                        Create Order
                    </button>
                </div>
            </div>
        </div>
    );
};