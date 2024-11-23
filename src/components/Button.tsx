import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <div className="fixed top-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center">
      <button
        onClick={onClick}
        className="w-[300px] h-[40px] bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-all"
      >
        {text}
      </button>
    </div>
  );
};