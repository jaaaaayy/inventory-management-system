import "dotenv/config";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import routes from "./routes.js";
import "./config/database.js";
import cors from "cors";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

// Validate required environment variables
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not defined.");
}

if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL environment variable is not defined.");
}

const app = express();

const isProduction = process.env.NODE_ENV === "production";

// Security headers
app.use(helmet());

// Parse JSON with size limit to prevent abuse
app.use(express.json({ limit: "10mb" }));

// CORS
const clientUrl = process.env.CLIENT_URL.replace(/\/$/, "");

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

// Trust proxy in production (required behind reverse proxies like Render, Railway, etc.)
if (isProduction) {
  app.set("trust proxy", 1);
}

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 60000 * 60 * 8,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      ttl: 60000 * 60 * 8,
      autoRemove: "native",
    }),
  })
);

// Routes
app.use(routes);
app.use(express.static("src/uploads"));

// Start server
const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}.`)
);

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));