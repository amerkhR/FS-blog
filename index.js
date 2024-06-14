import express from "express";

import mongoose from "mongoose";

import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js"
import * as PostController from "./controllers/PostController.js"

mongoose
  .connect(
    "mongodb+srv://amerkh:root1@cluster0.cpq2mxw.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("BD error", err));

const app = express();

app.use(express.json()); //позволяет читать json который приходит в req

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe)

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
