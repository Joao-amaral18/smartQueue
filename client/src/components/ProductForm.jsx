import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/products", {
        name,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      });
      console.log("Product created:", response.data);
      // Redirect to products list after successful creation
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error (show error message, etc.)
    }
  };

  // Format price to R$ 00,00
  const formattedPrice = parseFloat(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Adicionar Novo Produto</h2>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome do Produto
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Preço
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="formattedPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Preço Formatado
          </label>
          <input
            type="text"
            id="formattedPrice"
            value={formattedPrice}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            aria-describedby="formattedPriceDescription"
          />
          <p
            id="formattedPriceDescription"
            className="mt-2 text-sm text-gray-500"
          >
            Formatado como R$ 00,00
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Estoque
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Criar Produto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
