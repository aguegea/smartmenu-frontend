import * as React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    title: string;
    id: string;
  }

export const Card: React.FC<CardProps> = ({ title, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${id}`);
  };

  return (
    <div className="flex items-center justify-center h-[200px] w-[300px] bg-gray-200 rounded-lg shadow-md cursor-pointer" onClick={handleClick}>
      <div className="text-center text-lg font-semibold">
        {title}
      </div>
    </div>
  );
}