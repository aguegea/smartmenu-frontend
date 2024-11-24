import React from "react";
import {ScrollContainer} from "../components/HomePage/ScrollContainer";
import { Header } from "../components/HomePage/Header";

export const HomePage: React.FC = () => {
    return (
        <>  
            <Header />
            <ScrollContainer />
        </>
    );
}