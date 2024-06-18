import React, { useState } from "react";
import axios from "../api/axios";

const CreateOrderForm = () => {
  const [userId, setUserId] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/order", {
        userId,
        isFinished,
        orderItems,
      });
      console.log("Order created:", response.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Criar Novo Pedido</h2>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700"
          >
            ID do Usuário
          </label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="isFinished"
            className="block text-sm font-medium text-gray-700"
          >
            Finalizado
          </label>
          <select
            id="isFinished"
            value={isFinished}
            onChange={(e) => setIsFinished(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          >
            <option value="false">Não</option>
            <option value="true">Sim</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="orderItems"
            className="block text-sm font-medium text-gray-700"
          >
            Items do Pedido
          </label>
          <textarea
            id="orderItems"
            value={orderItems}
            onChange={(e) => setOrderItems(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Criar Pedido
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrderForm;
