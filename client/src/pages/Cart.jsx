import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(
      (item) => item._id !== id
    );
    updateCart(updated);
  };

  const changeQty = (id, qty) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, qty } : item
    );
    updateCart(updated);
  };

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const checkoutHandler = () => {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center border p-4 mb-4 rounded"
            >
              

              <div className="flex-1 ml-4">
                <h2 className="font-semibold">
                  {item.name}
                </h2>
                <p className="text-gray-600">
                  ${item.price}
                </p>

                <select
                  value={item.qty}
                  onChange={(e) =>
                    changeQty(
                      item._id,
                      Number(e.target.value)
                    )
                  }
                  className="mt-2 border rounded px-2 py-1"
                >
                  {[...Array(10).keys()].map((x) => (
                    <option
                      key={x + 1}
                      value={x + 1}
                    >
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">
            Summary
          </h2>

          <p className="mb-2">
            Items: <strong>{totalItems}</strong>
          </p>
          <p className="mb-4">
            Total:{" "}
            <strong>${totalPrice.toFixed(2)}</strong>
          </p>

          <button
            onClick={checkoutHandler}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
