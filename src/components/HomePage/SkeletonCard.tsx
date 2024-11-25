import React from "react";

// Imita los tamaños de mi componente Card
export const SkeletonCard: React.FC = () => {
    return (
        <div className="card bg-base-200 shadow-md animate-pulse cursor-pointer w-10/12 sm:w-[450px] md:w-[500px] max-w-[500px] min-w-[250px] mx-auto">
            <div className="card-body flex items-center justify-center h-[200px]">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
        </div>
    );
};
