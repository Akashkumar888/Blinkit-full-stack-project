import "dotenv/config";

import http from "http";

import app from "./app.js";

import connectDB from "./configs/db.config.js";
import connectCloudinary from "./configs/cloudinary.config.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

/* ==========================================================
   Start Server
========================================================== */

const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    server.listen(PORT, () => {
      console.log(`
==========================================================
🚀 Blinkit Server Started Successfully

Environment : ${process.env.NODE_ENV || "development"}

Server      : http://localhost:${PORT}

==========================================================
`);
    });
  } catch (error) {
    console.error("Server Startup Failed");
    console.error(error);

    process.exit(1);
  }
};

startServer();

/* ==========================================================
   Graceful Shutdown
========================================================== */

process.on("SIGINT", () => {
  console.log("\nShutting down server...");

  server.close(() => {
    console.log("HTTP Server Closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("\nSIGTERM received.");

  server.close(() => {
    console.log("HTTP Server Closed");
    process.exit(0);
  });
});

/* ==========================================================
   Handle Unhandled Errors
========================================================== */

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception");
  console.error(error);

  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection");
  console.error(reason);

  process.exit(1);
});