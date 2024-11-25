export interface Restaurant {
    _id: string;
    name: string;
}

export interface ApiResponseHomePage {
    restaurants: Restaurant[];
    hasMore: boolean;
}

export interface Product {
    _id: string;
    name: string;
    price: number;
}

export interface ProductOrder extends Product {
    quantity: number;
}

export interface Order {
    _id: string;
    products: ProductOrder[];
    total: number;
}

export interface ApiResponseProducts {
    products: Product[];
}

export interface ApiResponseOrders {
    orders: Order[];
}
