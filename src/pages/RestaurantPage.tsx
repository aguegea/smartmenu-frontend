import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../components/Modal";

interface Product {
    _id: string;
    name: string;
    price: number;
}

interface ProductOrder extends Product {
    quantity: number; // Campo adicional para el contador
  }

interface Order {
    _id: string;
    products: ProductOrder[];
    total: number;
}
  
interface ApiResponseRestaurantPage {
    products: Product[];
    orders: Order[];
}

export const RestaurantPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const res = await axios.get<ApiResponseRestaurantPage>(`http://localhost:3001/api/restaurants/${id}`);
            const { products, orders } = res.data;
            setProducts(products);
            setOrders(orders);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        if (id) fetchProducts();
      }, [id]);
    
      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Button text="Show Products" onClick={handleOpenModal} />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} products={products} />
            
            <h2 className="text-xl font-bold mb-4">Orders</h2>
        </div>
    );
}