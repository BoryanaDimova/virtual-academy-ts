import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { User, UserModel } from "../entitities/user.type";
import { CreateUserInput, UpdateUserInput } from "../inputsAndArgs/user.input";
import bcryptjs from "bcryptjs"
import { UserRoles } from "../auth/user.roles";
import { UserInputError } from "apollo-server-express";
// import { UserRoles } from "./user-roles";

@Resolver(of => User)
export class UserResolver {

  @Query(returns => [User])
  async users():Promise<User[]> {
    return await UserModel.find({})
  }

  @Query(returns => User)
  async user(@Arg("_id") _id: string):Promise<User> {
    return await UserModel.findById(_id);
  }

  @Authorized()
  @Mutation(returns => User)
  async createUser(@Arg("data") data: CreateUserInput):Promise<User> {
    return createNewUser(data);
  }

  @Authorized()
  @Mutation(returns => User)
  async updateUser(@Arg("_id") _id: string, @Arg("data") data: UpdateUserInput) :Promise<User> {
    const userData = data.password ? {...data, password: bcryptjs.hashSync(data.password, 10)} : data;
    return await UserModel.findByIdAndUpdate(_id, userData, {new: true});
  }

  @Authorized()
  @Mutation(returns => User)
  async deactivateUser(@Arg("_id") _id: string) :Promise<User>{
    const userData = {isActive: false};
    return await UserModel.findByIdAndUpdate(_id, userData, {new: true});
  }

  @Authorized()
  @Mutation(returns => User)
  async activateUser(@Arg("_id") _id: string) :Promise<User>{
    const userData = {isActive: true};
    return await UserModel.findByIdAndUpdate(_id, userData, {new: true});
  }

  @Authorized([UserRoles.ADMIN])
  @Mutation(returns => User)
  async deleteUser(@Arg("_id") _id: string):Promise<User> {
    return await UserModel.findByIdAndRemove(_id);
  }
}

export async function createNewUser(data: CreateUserInput) :Promise<User>{
  const isExistingUser = await UserModel.find({ 'email' :  data.email });
  
  if(isExistingUser.length > 0){
    throw new UserInputError("Email not unique.");
  }

  const userData = {...data, password: bcryptjs.hashSync(data.password, 10)}; 
  const newUser = new UserModel(userData);
  await newUser.save();
  return newUser;
}