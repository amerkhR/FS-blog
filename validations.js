import {body} from "express-validator"

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(), //провреяем является свойство эмайлом
  body("password", "Пароль должен состоять хотя бы из 5-ти символов").isLength({min: 5}), //проверяем длину пароля
]

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(), //провреяем является свойство эмайлом
  body("password", "Пароль должен состоять хотя бы из 5-ти символов").isLength({min: 5}), //проверяем длину пароля
  body("fullName", "Укажите имя").isLength({min: 5}), //проверяем длину пароля
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(), //опциональная проверка
]

export const postCreateValidation = [
  body("title", "Неверный формат почты").isLength({min: 5}).isString(),
  body("text", "Введите текст статьи").isLength({min: 10}).isString(), 
  body("tags", "Неверный формат тэгов (укажите массив)").optional().isString(), 
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(), 
]