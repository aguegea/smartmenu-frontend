import React from 'react';

interface ProductOrder {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  products: ProductOrder[];
  total: number;
}

interface OrdersProps {
  orders: Order[];
  expandedOrders: { [key: string]: boolean }; // Objeto clave-valor. El booleano indica las ordenes expandidas.
  toggleOrder: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
}

export const Orders: React.FC<OrdersProps> = ({ orders, expandedOrders, toggleOrder, deleteOrder }) => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      {orders.map((order, index) => (
        <div
          key={order._id}
          className={`collapse collapse-arrow card bg-base-200 shadow-md w-10/12 sm:w-[450px] md:w-[500px] max-w-[500px] min-w-[250px] mx-auto ${
            expandedOrders[order._id] ? 'collapse-open' : ''
          }`}
        >
          <div
            className="collapse-title text-xl font-semibold flex justify-between items-center cursor-pointer"
            onClick={() => toggleOrder(order._id)}
          >
            <div>
              <h3 className="card-title text-primary font-semibold">
                Order {index + 1}
              </h3>
              <p className="text-accent">Total: ${order.total.toFixed(2)}</p>
            </div>
          </div>
          <div className="collapse-content">
            <ul>
              {order.products.map((product) => (
                <li key={product._id} className="flex justify-between">
                  <span>
                    <span className="font-bold">{product.name}</span> x {product.quantity}
                  </span>
                  <span>
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-error btn-sm"
                onClick={() => deleteOrder(order._id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};