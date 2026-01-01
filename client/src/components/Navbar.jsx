import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [cartCount, setCartCount] = useState(0);

  // Update cart count
  useEffect(() => {
    const cartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalQty = cartItems.reduce(
      (acc, item) => acc + item.qty,
      0
    );
    setCartCount(totalQty);
  }, []);

  // Logout
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Left */}
      <Link to="/" className="text-xl font-bold">
        ShopMini
      </Link>

      {/* Right */}
      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </Link>

        {!userInfo ? (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        ) : (
          <>
            {userInfo.isAdmin && (
              <Link
                to="/admin"
                className="text-yellow-400 hover:text-yellow-300"
              >
                Admin
              </Link>
            )}

            <span className="text-sm">
              Hello, {userInfo.name}
            </span>

            <button
              onClick={logoutHandler}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
