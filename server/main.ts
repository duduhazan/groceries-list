import { connectDB } from "./connect-to-db";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { productsRouter } from "./routes/products.route";
import { UserRouter } from "./routes/users.route";
import { ImageStorage } from "./image-storage";
import { authMiddleWare } from "./middlewares/auth.middleware";
import { writeFile } from "fs/promises";

async function startServer() {
  await connectDB(process.env.DB_URL!);

  const port = process.env.PORT;
  const app = express();
  const keyJson = process.env.KEY_JSON;
  if (keyJson) {
    await writeFile("./key.json", process.env.KEY_JSON!);
  }

  const imageStorage = new ImageStorage("./key.json", "shopping-cart-images");
  const secret = process.env.SECRET!;

  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

  app.use(express.json());

  app.use(cookieParser());

  app.use(authMiddleWare(secret));

  app.use(UserRouter(secret));

  app.use(productsRouter(imageStorage));

  app.listen(port, () => {
    console.log(`started server on port ${port}`);
  });
}

startServer();
