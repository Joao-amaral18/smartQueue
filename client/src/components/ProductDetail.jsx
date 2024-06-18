import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Product Detail</h2>
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
    </div>
  );
};

export default ProductDetail;
