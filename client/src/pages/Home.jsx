import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryFilter from "../components/CategoryFilter";
import NewYearBanner from "../components/NewYearBanner";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
  const fetchCategories = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/api/products"
    );
    const uniqueCategories = [
      ...new Set(data.map((p) => p.category)),
    ];
    setCategories(uniqueCategories);
  };

  fetchCategories();
}, []);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/products${
          selectedCategory ? `?category=${selectedCategory}` : ""
        }`
      );
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [selectedCategory]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/products"
        );
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
    const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <NewYearBanner />

      
    </div>
  );
  };
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to ShopMini</h1>
        <p className="text-xl mb-6">
          Your one-stop shop for amazing products!
        </p>
        <Link
          to="/cart"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg font-semibold"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center text-lg">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded shadow hover:shadow-lg transition overflow-hidden"
              >
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {product.name}
                  </h3>
                  <p className="text-green-600 font-bold mb-2">
                    ${product.price}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
