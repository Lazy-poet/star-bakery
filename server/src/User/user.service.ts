import { User } from "../types";
import UserModel from "./user.schema";
export class UserService {
  async createUser(data: User) {
    const user = await UserModel.create(data);
    return user;
  }

  async findUser(id: string) {
    const user = await UserModel.findById(id).select('+password');
    return user;
  }
  async findUserByName(name: string) {
    const user = await UserModel.findOne({username: name}).select('+password');
    return user;
  }
}
