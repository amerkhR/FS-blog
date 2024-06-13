import {body} from "express-validator"

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(), //провреяем является свойство эмайлом
  body("password", "Пароль должен состоять хотя бы из 5-ти символов").isLength({min: 5}), //проверяем длину пароля
  body("fullName", "Укажите имя").isLength({min: 5}), //проверяем длину пароля
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(), //опциональная проверка
]