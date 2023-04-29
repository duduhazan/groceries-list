import Joi from "joi";
import { GetProductUrlParams } from "../routes/products.route";

export function validateImage(image: GetProductUrlParams) {
  const schemaOfImage = Joi.object({
    imageName: Joi.string().required(),
  });

  return schemaOfImage.validate(image);
}
