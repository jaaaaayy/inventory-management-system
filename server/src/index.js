import express from "express";
import session from "express-session";
import routes from "./routes.js";
import "./config/database.js";
import cors from "cors";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://inventory-management-system-tscc.vercel.app",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60000 * 60 * 8,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      ttl: 60000 * 60 * 8,
      autoRemove: "native",
    }),
  })
);
app.use(routes);
app.use(express.static("src/uploads"));

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}.`));
