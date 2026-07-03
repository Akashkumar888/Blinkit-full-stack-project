import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware.js";
import {
  CashOnDeliveryOrderController,
  getOrderDetailsController,
  paymentController,
  webhookStripe,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", authUser, CashOnDeliveryOrderController);
orderRouter.post("/checkout", authUser, paymentController);
orderRouter.post("/webhook", webhookStripe);
orderRouter.get("/order-list", authUser, getOrderDetailsController);

export default orderRouter;
