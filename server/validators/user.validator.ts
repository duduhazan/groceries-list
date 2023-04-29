import Joi from "joi";
import { User } from "../interfaces/user.interfaces";

export function validateLoginUser(user: User) {
  const schemaOfLoginUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schemaOfLoginUser.validate(user);
}

export function validateRegisterUser(user: User) {
  const schemaOfUser = Joi.object({
    name: Joi.string().required().min(2).max(255),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schemaOfUser.validate(user);
}
