import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ userInfo, editingProduct, onSuccess }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setDescription(editingProduct.description);
      setImage(editingProduct.image);
      setStock(editingProduct.stock);
    } else {
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setStock("");
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { name, price, description, image, stock };

    try {
      if (editingProduct) {
        // Update product
        await axios.put(
          `http://localhost:3000/api/products/${editingProduct._id}`,
          productData,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
      } else {
        // Create product
        await axios.post("http://localhost:3000/api/products", productData, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
      }
      onSuccess();
    } catch (err) {
      alert("Failed to save product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded md:col-span-2"
        ></textarea>
      </div>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
