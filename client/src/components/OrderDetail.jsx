import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Modal from "./Modal";

const OrderDetail = () => {
  const { orderId } = useParams(); 
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]); 

  const fetchOrder = async () => {
    try {
      setIsModalOpen(true);
      const response = await axios.get(`/order/${orderId}`);
      const orderData = response.data;

      const orderItemsWithProducts = await Promise.all(
        orderData.orderItems.map(async (item) => {
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
              stock: product.stock, // Adiciona o estoque ao item do pedido
            },
          };
        })
      );
    const userResponse = await axios.get(`/users/${orderData.userId}`);
    setUser(userResponse.data);
      setOrder({
        ...orderData,
        orderItems: orderItemsWithProducts,
      });
      
      console.log(orderData);
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
    }
    setIsModalOpen(false);
  };

  const deleteOrder = async () => {
    setIsModalOpen(true);
    try {
      await axios.delete(`/order/${orderId}`);
      // Redirect or show success message after deletion
      console.log(`Order ${orderId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting order ${orderId}:`, error);
    }
    setIsModalOpen(false);
  };

  const updateQuantity = async (itemId, delta) => {
    try {
      setIsModalOpen(true);

      const updatedOrder = {
        ...order,
        orderItems: order.orderItems.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        ),
      };

      await axios.put(`/order/${orderId}`, updatedOrder);

      setOrder(updatedOrder);

      console.log(`Quantity updated for item ${itemId} in order ${orderId}.`);
    } catch (error) {
      console.error(
        `Error updating quantity for item ${itemId} in order ${orderId}:`,
        error
      );
    } finally {
      setTimeout(() => {
        setIsModalOpen(false); // Fecha o modal após um segundo
      }, 1000);
    }
  };

  const finishOrder = async () => {
    try {
      setIsModalOpen(true);
      await axios.put(`/order/${orderId}`, {
        ...order,
        isFinished: true,
      });
      setOrder({
        ...order,
        isFinished: true,
      });
      console.log(`Order ${orderId} finished successfully.`);
    } catch (error) {
      console.error(`Error finishing order ${orderId}:`, error);
    } finally {
      setTimeout(() => {
        setIsModalOpen(false); // Fecha o modal após um segundo
      }, 1000);
    }
  };

  if (!order) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Detalhes do Pedido #{order.id}
      </h2>
      <p>
        <strong>Usuário:</strong> {user.name}
      </p>
      <p>
        <strong>Finalizado:</strong>{" "}
        {order.isFinished ? <span className="bg-green-500 p-2 rounded-sm text-white">Sim</span> : "Não"}
      </p>
      <ul className="list-disc list-inside mb-4 hr">
        {order.orderItems.map((item) => (
          <li className="m-2 py-2 hr shadow-sm" key={item.id}>
            {item.quantity} x {item.product.name} - R${" "}
            {item.product.price.toFixed(2)}
            {!order.isFinished && (
              <button
                className="ml-2 bg-green-500 hover:bg-green-600 text-white py-1 px-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
                onClick={() => updateQuantity(item.id, 1)}
                disabled={item.quantity >= item.product.stock}
              >
                +
              </button>
            )}
            {!order.isFinished && (
              <button
                className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                onClick={() => updateQuantity(item.id, -1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
            )}
          </li>
        ))}
      </ul>
      {!order.isFinished && (
        <>
          <button
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md mt-4 mr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onClick={finishOrder}
          >
            Finalizar Pedido
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={deleteOrder}
          >
            Excluir Pedido
          </button>
        </>
      )}
      <Modal isOpen={isModalOpen} />
    </div>
  );
};

export default OrderDetail;
