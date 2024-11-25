import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import { SkeletonCard } from "./SkeletonCard";
import { Loading } from "./Loading";
import { Restaurant, ApiResponseHomePage } from "../../types/types";

export const ScrollContainer: React.FC = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const limit = 13;

    const fetchRestaurants = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await axios.get<ApiResponseHomePage>(
                `${API_URL}/api/restaurants`,
                {
                    params: { skip, limit },
                },
            );

            const { restaurants: newRestaurants, hasMore: more } = res.data; // Desestructuro la respuesta de la API

            if (newRestaurants.length > 0) {
                setRestaurants((prev) => [...prev, ...newRestaurants]);
                setSkip((prev) => prev + limit);
            }

            setHasMore(more);
        } 
        catch (err) {
            console.error(err);
        } 
        finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight 
            && hasMore
        ) {
            fetchRestaurants();
        }
    };

    // Con StrictMode fetchea dos veces, en producción no está este problema.
    useEffect(() => {
        fetchRestaurants();
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <div className="flex flex-col items-center max-w-[600px] w-full mx-auto my-4 gap-4">
            <h1 className="text-3xl font-bold text-base-content text-center my-4">
                Choose your restaurant:
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
                {loading && restaurants.length === 0 ? (
                    // Muestro 3 SkeletonCard mientras se cargan los datos iniciales
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    // Muestro las Card normales cuando ya fue fetcheada la data
                    restaurants.map((restaurant) => (
                        <Card
                            key={restaurant._id}
                            title={restaurant.name}
                            id={restaurant._id}
                        />
                    ))
                )}
            </div>
            {hasMore && <Loading />}
        </div>
    );
};
