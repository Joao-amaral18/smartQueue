import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/order");
      const fetchedOrders = await Promise.all(
        response.data.map(async (order) => {
          const userResponse = await axios.get(`/users/${order.userId}`);
          const user = userResponse.data;

          const orderItemsWithProducts = await Promise.all(
            order.orderItems.map(async (item) => {
              const productResponse = await axios.get(
                `/products/${item.productId}`
              );
              const product = productResponse.data;

              return {
                ...item,
                product: {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                },
              };
            })
          );

          return {
            ...order,
            user: user,
            orderItems: orderItemsWithProducts,
          };
        })
      );
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Pedidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
            <p className="text-gray-600 mb-2">Usuário: {order.user.name}</p>
            <p className="text-gray-600 mb-2">
              Finalizado: {order.isFinished ? "Sim" : "Não"}
            </p>
            <ul className="list-disc list-inside mb-2">
              {order.orderItems.map((item) => (
                <li key={item.id}>
                  {item.quantity} x {item.product.name} - R${" "}
                  {item.product.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <Link
              to={`/order/${order.id}`}
              className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${
                order.isFinished
                  ? "bg-gray-300 text-gray-600 hover:bg-gray-400"
                  : "bg-yellow-600 text-white hover:bg-yellow-700"
              }`}
            >
              {order.isFinished ? "Ver Pedido" : "Continuar Pedido"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
