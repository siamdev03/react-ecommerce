// src/components/CheckoutForm.jsx
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ cartItems, user, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------- PLACE ORDER (COD) ----------
  const placeCODOrder = async () => {
    try {
      setLoading(true);
      await axios.post(
        "/api/orders",
        {
          products: cartItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            price: item.price,
            product: item._id,
          })),
          paymentMethod: "COD",
          totalPrice,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Order placed successfully (Cash on Delivery)");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- STRIPE PAYMENT ----------
  const handleStripePayment = async () => {
    if (!stripe || !elements) return;

    try {
      setLoading(true);
      setError("");

      // 1️⃣ Create PaymentIntent
      const { data } = await axios.post(
        "/api/payments/stripe",
        { amount: totalPrice },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // 2️⃣ Confirm Card Payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email: user.email },
        },
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      // 3️⃣ Save Order after payment success
      if (result.paymentIntent.status === "succeeded") {
        await axios.post(
          "/api/orders",
          {
            products: cartItems.map((item) => ({
              name: item.name,
              qty: item.qty,
              price: item.price,
              product: item._id,
            })),
            paymentMethod: "Stripe",
            totalPrice,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        alert("Payment successful & order placed 🎉");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (paymentMethod === "COD") {
      await placeCODOrder();
    } else {
      await handleStripePayment();
    }
  };

  return (
    <form onSubmit={submitHandler} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Payment Method</h2>

      <label className="block">
        <input
          type="radio"
          value="COD"
          checked={paymentMethod === "COD"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />{" "}
        Cash on Delivery
      </label>

      <label className="block">
        <input
          type="radio"
          value="Stripe"
          checked={paymentMethod === "Stripe"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />{" "}
        Card Payment (Stripe)
      </label>

      {paymentMethod === "Stripe" && (
        <div className="border p-3 rounded">
          <CardElement />
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
};

export default CheckoutForm;
