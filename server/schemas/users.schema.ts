import { Schema, model } from "mongoose";

const user = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const userModel = model("User", user);

export default userModel;
