import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./User/User.entity";
export const UserModel = getModelForClass(User);