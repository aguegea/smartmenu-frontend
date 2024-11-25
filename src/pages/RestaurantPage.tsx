import { useParams } from "react-router-dom";
import { Button } from "../components/RestaurantPage/Button";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../components/RestaurantPage/Modal";
import { Orders } from "../components/RestaurantPage/Orders";
import { Order, ApiResponseOrders } from "../types/types";

export const RestaurantPage: React.FC = () => {
    // Estado del modal
    const { id } = useParams<{ id: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Manejo el estado de las ordenes en este archivo pues es compartido por ambos componentes (Modal, Orders)
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState<boolean>(false);

    // useCallback cachea la función y su referencia no se recrea innecesariamente entre renderizados
    // sino cuando cambia alguna de sus dependencias (en este caso el campo id).
    const fetchOrders = useCallback(async () => {
        if (!id) return;
        setLoadingOrders(true);

        try {
            const res = await axios.get<ApiResponseOrders>(
                `http://localhost:3001/api/restaurants/${id}/orders`,
            );
            setOrders(res.data.orders);
        } 
        catch (error) {
            console.error("Error fetching orders:", error);
        } 
        finally {
            setLoadingOrders(false);
        }
    }, [id]);

    useEffect(() => {
        if (!id) return;
        fetchOrders();
    }, [id, fetchOrders]);

    return (
        <div className="flex flex-col items-center mb-[50px]">
            <Button text="Make an Order" onClick={handleOpenModal} />
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                restaurantId={id!}
                fetchOrders={fetchOrders}
            />

            <h1 className="text-3xl font-bold mb-4">Orders:</h1>
            <Orders
                orders={orders}
                loading={loadingOrders}
                fetchOrders={fetchOrders}
                restaurantId={id!}
            />
        </div>
    );
};
