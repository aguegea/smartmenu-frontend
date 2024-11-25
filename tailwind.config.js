/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                smartmenu: {
                    primary: "#FF8C00", // DarkOrange
                    secondary: "#FFA500", // Orange
                    accent: "#4B4B4B", // Dark gray for text
                    neutral: "#FFFFFF", // White background
                    "base-100": "#FFFFFF", // White base
                    "base-200": "#F0F0F0", // Light gray (slightly darker than neutral)
                    "base-300": "#D9D9D9", // Darker gray for the card background
                    "base-400": "#BFBFBF",
                    "base-content": "#000000", // Black text
                    info: "#2094f3",
                    success: "#009485",
                    warning: "#ff9900",
                    error: "#F87272",
                },
            },
        ],
    },
};
