import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from './RestaurantCard';
import { Loading } from './Loading';

interface Restaurant {
  _id: string;
  name: string;
}
  
interface ApiResponseHomePage {
  restaurants: Restaurant[];
  hasMore: boolean;
}

export const ScrollContainer: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 13;

  const fetchRestaurants = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.get<ApiResponseHomePage>('http://localhost:3001/api/restaurants', {
        params: { skip, limit },
      });
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
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore) {
        fetchRestaurants();
      }
    }
  };

  // Con StrictMode fetchea dos veces, en producción no está este problema.
  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className="flex flex-col items-center max-w-[400px] w-full mx-auto my-4 gap-4">
      <h1>Choose your restaurant</h1>
        {restaurants.map((restaurant) => (
          <Card title={restaurant.name} id={restaurant._id} />
        ))}
        {hasMore && <Loading />}
    </div>
  );
};