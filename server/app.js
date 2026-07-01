import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import uploadRouter from "./routes/upload.route.js";
import subCategoryRouter from "./routes/subCategory.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();

/* ==========================================================
   Security Middleware
========================================================== */

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/* ==========================================================
   CORS Configuration
========================================================== */

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

/* ==========================================================
   Body Parser
========================================================== */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ==========================================================
   Cookies
========================================================== */

app.use(cookieParser());

/* ==========================================================
   Logger
========================================================== */

app.use(
  morgan(
    process.env.NODE_ENV === "production"
      ? "combined"
      : "dev"
  )
);

/* ==========================================================
   Health Check
========================================================== */

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Blinkit API is running successfully.",
    timestamp: new Date().toISOString(),
  });
});

/* ==========================================================
   API Routes
========================================================== */

app.use("/api/user", userRouter);
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)

/* ==========================================================
   404 Handler
========================================================== */

app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

/* ==========================================================
   Global Error Handler
========================================================== */

app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.status || 500).json({
    success: false,
    error: true,
    message: err.message || "Internal Server Error",
  });
});

export default app;