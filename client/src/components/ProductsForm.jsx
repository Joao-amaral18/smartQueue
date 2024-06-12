import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onSubmit, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </label>
      <label>Stock:
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
