import React from "react";

export const Header: React.FC = () => {
    return (
        <header className="bg-neutral text-center py-10">
            <h1 className="text-5xl font-bold text-primary mb-6">SmartMenu</h1>
            <p className="text-lg text-accent max-w-2xl mx-auto px-4 sm:px-6">
                Tired of spending thousands of dollars on software for the
                management of your restaurant?
                <br />
                SmartMenu brings you the solution.
                <br />
                Upload your plates, create and delete orders from $11.99 per month.
            </p>
        </header>
    );
};
