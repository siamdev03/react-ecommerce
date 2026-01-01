import express from "express";
import { v4 as uuidv4 } from "uuid";
import Order from "../models/Order.js";
import { sslcommerz } from "../config/sslcommerz.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sslcommerz", protect, async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  const transactionId = uuidv4();

  const data = {
    total_amount: order.totalPrice,
    currency: "BDT",
    tran_id: transactionId,
    success_url: `${process.env.BACKEND_URL}/api/payment/success/${orderId}`,
    fail_url: `${process.env.BACKEND_URL}/api/payment/fail/${orderId}`,
    cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel/${orderId}`,
    product_name: "ShopMini Order",
    product_category: "Ecommerce",
    product_profile: "general",

    cus_name: "Customer",
    cus_email: "customer@email.com",
    cus_add1: order.shippingAddress.address,
    cus_city: order.shippingAddress.city,
    cus_country: order.shippingAddress.country,
    cus_phone: "01700000000",
  };

  const response = await sslcommerz.init(data);
  res.json({ url: response.GatewayPageURL });
});

router.post("/success/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.isPaid = true;
  order.paidAt = Date.now();
  await order.save();

  res.redirect(`${process.env.FRONTEND_URL}/order-success`);
});

router.post("/fail/:id", (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
});

router.post("/cancel/:id", (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment-cancelled`);
});

export default router;
