import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import PedidoModal from "./PedidoModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/order");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const addToOrder = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleOrderSelect = async (orderId) => {
    console.log(localStorage.getItem("userId"));
    setShowModal(false);
    if (orderId === "new") {
      try {
        const newOrder = {
          userId: localStorage.getItem("userId"),
          isFinished: false,
          orderItems: [
            {
              productId: selectedProduct.id,
              quantity: 1,
            },
          ],
        };
        await axios.post("/order", newOrder);
        fetchOrders();
      } catch (error) {
        console.error("Error creating new order:", error);
      }
    } else {
      try {
        const order = orders.find((o) => o.id === orderId);
        const updatedOrder = {
          ...order,
          orderItems: [
            ...order.orderItems,
            {
              productId: selectedProduct.id,
              quantity: 1,
            },
          ],
        };
        await axios.put(`/order/${orderId}`, updatedOrder);
        fetchOrders(); 
      } catch (error) {
        console.error(`Error updating order ${orderId}:`, error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 mb-2">R${product.price.toFixed(2)}</p>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onClick={() => addToOrder(product)}
            >
              Adicionar ao Pedido
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <PedidoModal onClose={() => setShowModal(false)}>
          <h3 className="text-xl font-semibold mb-4">Selecione um Pedido</h3>
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="mb-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => handleOrderSelect(order.id)}
                >
                  Pedido #{order.id}
                </button>
              </li>
            ))}
            <li>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleOrderSelect("new")}
              >
                Criar Novo Pedido
              </button>
            </li>
          </ul>
        </PedidoModal>
      )}
    </div>
  );
};

export default ProductList;
