import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

import UserModel from "./models/User.js";

mongoose
  .connect(
    "mongodb+srv://amerkh:root1@cluster0.cpq2mxw.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("BD error", err));

const app = express();

app.use(express.json()); //позволяет читать json который приходит в req

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10); //алгоритм шифрования пароля
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save(); //сохраняем пользователя в БД

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d", //срок годности токена
      }
    );

    const {passwordHash, ...userData} = user._doc
    
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрировать",
    });
  }
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
