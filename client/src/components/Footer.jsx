import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className={`mt-12 ${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"}`}>
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Theme Toggle */}
        <div>
          <h2 className={`text-2xl font-bold mb-3 ${darkMode ? "text-white" : "text-black"}`}>
            ShopMini
          </h2>
          <p className="text-sm mb-4">
            Your trusted online store for quality products at the best price.
          </p>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-2 rounded ${darkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-300 text-gray-800"}`}
          >
            {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            <a className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 text-white"><FaFacebookF /></a>
            <a className="bg-gray-800 p-2 rounded-full hover:bg-pink-500 text-white"><FaInstagram /></a>
            <a className="bg-gray-800 p-2 rounded-full hover:bg-sky-500 text-white"><FaTwitter /></a>
            <a className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 text-white"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-black"}`}>Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Cart</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-black"}`}>Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Return Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-black"}`}>Contact</h3>
          <p className="text-sm">📍 Dhaka, Bangladesh</p>
          <p className="text-sm">📧 support@shopmini.com</p>
          <p className="text-sm">📞 +880 1700-000000</p>
        </div>
      </div>

      <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-300"} text-center py-4 text-sm`}>
        © {new Date().getFullYear()} ShopMini. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
