import express from "express";
import session from "express-session";
import routes from "./routes.js";
import "./config/database.js";
import cors from "cors";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "full-stack developer",
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60000 * 60 * 8,
    },
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase",
      ttl: 60 * 60 * 8,
      autoRemove: "native",
    }),
  })
);
app.use(routes);
app.use(express.static("src/uploads"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}.`));
