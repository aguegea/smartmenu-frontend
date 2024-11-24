import React from 'react';
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
    <div
      className="card bg-base-200 shadow-md cursor-pointer w-10/12 sm:w-[450px] md:w-[500px] max-w-[500px] min-w-[250px] mx-auto"
      onClick={handleClick}
    >
      <div className="card-body flex items-center justify-center h-[200px]">
        <h2 className="card-title text-center text-accent font-semibold">
          {title}
        </h2>
      </div>
    </div>
  );
};
