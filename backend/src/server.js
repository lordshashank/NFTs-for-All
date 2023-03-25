import express from "express";
import { routes } from "./routes";
import { db } from "./database/db";

const app = express();

// body-parser can also be used instead of below two lines
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,AuthToken"
  );
  next();
});

routes.forEach((route) => app[route.method](route.path, route.handler));

const uri = process.env.MONGODB_URI;

const start = async () => {
  await db.connect(uri);
  app.listen(8000, () => {
    console.log("Server is listening on Port 8000");
  });
};
start();
