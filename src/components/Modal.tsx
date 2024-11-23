import React, { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface ProductOrder extends Product {
  quantity: number; // Campo adicional para el contador
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, products }) => {
   const [productOrders, setProductOrders] = useState<ProductOrder[]>(
    products.map((product) => ({
      ...product,
      quantity: 0, // Inicializa el campo `quantity` en 0
    }))
  );

  const increment = (id: string) => {
    setProductOrders((prev) =>
      prev.map((product) =>
        product._id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrement = (id: string) => {
    setProductOrders((prev) =>
      prev.map((product) =>
        product._id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-[500px] relative">
        <button
          className="absolute top-2 right-2 text-black hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Products</h2>
        {productOrders.length > 0 ? (
          <ul>
            {productOrders.map((product) => (
              <li
                key={product._id}
                className="mb-4 flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold">{product.name}</span> - $
                  {product.price.toFixed(2)}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="bg-gray-200 text-gray-800 px-2 rounded hover:bg-gray-300"
                    onClick={() => decrement(product._id)}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className="bg-gray-200 text-gray-800 px-2 rounded hover:bg-gray-300"
                    onClick={() => increment(product._id)}
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
    </div>
  );
};