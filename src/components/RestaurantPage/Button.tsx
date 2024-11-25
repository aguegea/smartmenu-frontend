import React from "react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <div className="flex justify-center my-[50px]">
            <button
                onClick={onClick}
                className="btn btn-primary w-11/12 sm:w-[350px] md:w-[400px] max-w-[450px] min-w-[200px] h-[50px] font-semibold rounded-md shadow-md text-xl"
            >
                {text}
            </button>
        </div>
    );
};
