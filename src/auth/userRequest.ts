import { User } from "../entitities/user.type";

declare module "express" { 
    export interface Request {
      user: User
    }
  }