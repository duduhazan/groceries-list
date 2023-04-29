import { Schema, model } from "mongoose";

const product = new Schema({
  name: String,
  price: Number,
  category: String,
  imageName: String,
});

const productModel = model("Product", product);

export default productModel;
