import express from "express";
import session from "express-session";
import routes from "./routes.js";
import "./config/database.js";
import cors from "cors";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "software engineer",
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: false,
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

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}.`));
