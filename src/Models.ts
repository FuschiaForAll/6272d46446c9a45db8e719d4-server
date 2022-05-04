import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./User/User.entity";
import { ToDo } from "./ToDo/ToDo.entity";
export const UserModel = getModelForClass(User);
export const ToDoModel = getModelForClass(ToDo);