import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    const cartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const existItem = cartItems.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existItem) {
      updatedCart = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, qty: item.qty + qty }
          : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );

    navigate("/cart");
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg">Loading...</p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>
          <p className="text-xl text-green-600 font-semibold mb-2">
            ${product.price}
          </p>

          <p className="text-gray-700 mb-4">
            {product.description}
          </p>

          <div className="flex items-center mb-4">
            <label className="mr-3 font-medium">Qty:</label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[...Array(10).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={addToCartHandler}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
