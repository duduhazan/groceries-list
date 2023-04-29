import { User } from "../../interfaces/user.interfaces";

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
