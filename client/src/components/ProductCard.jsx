import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      
      <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-1 font-bold">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
