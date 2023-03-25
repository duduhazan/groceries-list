import axios from "axios";
import { Item } from "./interfaces/item.interfaces";
import { User } from "./interfaces/user.interfaces";

export const serverUrl = "http://localhost:3500";
console.log("using server url", serverUrl);
const client = axios.create({ baseURL: serverUrl, withCredentials: true });
client.interceptors.response.use((res) => {
  if (res.status === 401) {
    window.location.href = "/";
  }
  return res;
});

export class Api {
  static async registerUser(user: User) {
    const { data } = await client.post("/user", user);
    return data;
  }

  static async loginUser(user: User) {
    const { data } = await client.post("/user/auth", user);
    return data;
  }

  static async getProducts() {
    const { data } = await client.get<Item[]>("/products");
    return data;
  }

  /* static async getOneProduct(productID) {
    const { data } = await client.get(`/products/${ProductID}`);
    return data;
  } */

  static async addProduct(product: FormData) {
    const { data } = await client.post("/product", product);
    return data;
  }

  static async updateProduct(id: string, newProduct: FormData) {
    const { data } = await client.put(`/products/${id}`, newProduct);
    return data;
  }

  static async getProductImageUrl(imageName: string) {
    const params = { imageName };
    const { data } = await client.get("/product-url/", { params });
    return data;
  }

  static async deleteProduct(productID: string) {
    const { data } = await client.delete(`/products/${productID}`);
    return data;
  }

  static async getUser() {
    const { data } = await client.get(`/user`);
    return data;
  }
}
