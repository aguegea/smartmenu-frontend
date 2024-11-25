import React from "react";

export const SkeletonOrderCard: React.FC = () => {
    return (
        <div className="h-[90px] card bg-base-200 shadow-md w-10/12 sm:w-[450px] md:w-[500px] max-w-[500px] min-w-[250px] mx-auto animate-pulse">
            <div className="card-body flex justify-center h-full p-5">
                <div className="h-12 bg-gray-400 rounded w-[150px]"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    );
};
