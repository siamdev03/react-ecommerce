import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (cartItems.length === 0) navigate("/cart");
  }, [userInfo, cartItems, navigate]);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:3000/api/orders",
        {
          products: cartItems.map((item) => ({
            product: item._id,
            name: item.name,
            qty: item.qty,
            price: item.price,
            image: item.image,
          })),
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
          },
          paymentMethod,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.removeItem("cartItems");
      navigate("/order-success");
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={placeOrderHandler}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Shipping */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Shipping</h2>

          <input
            className="w-full border p-2 mb-3"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 mb-3"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 mb-3"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <input
            className="w-full border p-2"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        {/* Payment + Summary */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

          <label className="block mb-2">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Cash on Delivery
          </label>

          <label className="block mb-4">
            <input
              type="radio"
              value="Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Card / Online Payment
          </label>

          <hr className="my-4" />

          <p>Items: ${itemsPrice.toFixed(2)}</p>
          <p>Shipping: ${shippingPrice.toFixed(2)}</p>
          <p className="font-bold">
            Total: ${totalPrice.toFixed(2)}
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-black py-2 mt-4 rounded"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
