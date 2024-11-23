import React from "react";
import {ScrollContainer} from "../components/ScrollContainer";
import { Header } from "../components/Header";

export const HomePage: React.FC = () => {
    return (
        <>  
            <Header />
            <ScrollContainer />
        </>
    );
}