import { useParams } from "react-router-dom";
import { Button } from "../components/RestaurantPage/Button";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../components/RestaurantPage/Modal";
import { Orders } from "../components/RestaurantPage/Orders";

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface ProductOrder extends Product {
  quantity: number;
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

// A diferencia de mi componente HomePage, en RestaurantPage hago el fetcheo de la data desde acá 
// para tener cargados las ordenes en la pagina, y los productos para cuando se abra el modal.
export const RestaurantPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({});

    // Sucede que como paso fetchProducts a un hijo de mi componente Modal
    // se crea la funciónn cada vez que se rerenderiza.
    /*
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

    useEffect(() => {
      if (id) fetchProducts();
    }, [id]);
    */

    // useCallback cachea la función y su referencia no se recrea innecesariamente entre renderizados
    // sino cuando cambia alguna de sus dependencias (en este caso el campo id).
    const fetchProducts = useCallback(async () => {
      try {
        const res = await axios.get<ApiResponseRestaurantPage>(
          `http://localhost:3001/api/restaurants/${id}`
        );
        const { products, orders } = res.data;
        setProducts(products);
        setOrders(orders);
      } 
      catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    }, [id]);
    
    useEffect(() => {
      if (id) fetchProducts();
    }, [id, fetchProducts]);
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const toggleOrder = (orderId: string) => {
      setExpandedOrders(prevState => ({
        ...prevState,
        [orderId]: !prevState[orderId], // Si estaba abierto, lo cierra y viceversa.
      }));
    };

    const deleteOrder = async (orderId: string) => {
      try {
        await axios.delete(`http://localhost:3001/api/restaurants/${id}/orders/${orderId}`);
        fetchProducts(); // Fetcheo de nuevo pues eliminé una orden del restaurante
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    };

    return (
      <div className="flex flex-col items-center mb-[50px]">
        <Button text="Make an Order" onClick={handleOpenModal} />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} products={products} restaurantId={id!} onOrderCreated={fetchProducts} />
          
        <h1 className="text-3xl font-bold mb-4">Orders:</h1>
        <Orders orders={orders} expandedOrders={expandedOrders} toggleOrder={toggleOrder} deleteOrder={deleteOrder} />
      </div>
    );
}