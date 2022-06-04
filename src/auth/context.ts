import { Request } from "express";
import { User } from "../entitities/user.type";

export interface Context {
    req: Request,
    user: User,
}