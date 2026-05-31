import "./config/env.js";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import routes from "./routes.js";
import { connectDatabase } from "./config/database.js";
import cors from "cors";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { validateS3Config } from "./config/s3.js";

// Validate required environment variables
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not defined.");
}

if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL environment variable is not defined.");
}

validateS3Config();

const isProduction = process.env.NODE_ENV === "production";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000;

const app = express();

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Parse JSON with size limit to prevent abuse
app.use(express.json({ limit: "10mb" }));

// CORS
const clientUrl = process.env.CLIENT_URL;

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

app.use("/api", (request, response, next) => {
  response.set("Cache-Control", "no-store");
  next();
});

const createSessionMiddleware = () =>
  session({
    secret: process.env.SESSION_SECRET,
    proxy: isProduction,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: SESSION_TTL_MS,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      ttl: SESSION_TTL_SECONDS,
      autoRemove: "native",
    }),
  });

const port = process.env.PORT || 3000;

let isShuttingDown = false;

const shutdown = (server, signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`${signal} received. Shutting down gracefully...`);

  const forceExit = setTimeout(() => {
    console.error("Graceful shutdown timed out.");
    process.exit(1);
  }, 10000);
  forceExit.unref();

  server.close(async (error) => {
    try {
      if (error) {
        throw error;
      }

      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
      clearTimeout(forceExit);
      process.exit(0);
    } catch (shutdownError) {
      console.error("Error during shutdown:", shutdownError);
      clearTimeout(forceExit);
      process.exit(1);
    }
  });
};

const startServer = async () => {
  await connectDatabase();

  app.use(createSessionMiddleware());
  app.use(routes);
  app.use(express.static("src/uploads"));

  const server = app.listen(port, () =>
    console.log(`Server running on port ${port}.`)
  );

  process.on("SIGTERM", () => shutdown(server, "SIGTERM"));
  process.on("SIGINT", () => shutdown(server, "SIGINT"));
};

startServer().catch(async (error) => {
  console.error("Failed to start server:", error);
  await mongoose.connection.close().catch(() => {});
  process.exit(1);
});
