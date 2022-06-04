import { Resolver, Query, Mutation, Args, Ctx } from "type-graphql";
import bcryptjs from "bcryptjs"
import { UserInputError, AuthenticationError } from "apollo-server-core";
import { Context } from "./context";
import { User, UserModel } from "../entitities/user.type";
import { LoginArguments } from "./auth.input";
import { getToken } from "./token";

const WRONG_CREDENTIALS = 'Wrong credentials.';

@Resolver()
export class AuthResolver {

  @Query(returns => User)
  async currentUser(@Ctx() ctx: Context):Promise<User> {
    console.log(ctx);
    if(!ctx.user) {
        throw new AuthenticationError('User not authenticated.');
    }
    return await UserModel.findById(ctx.user._id)
  }


  @Mutation(returns => String)
  async login(@Args(){email, password}: LoginArguments) {
    
    const user = await UserModel.findOne({email});
    if(!user) {
        throw new UserInputError(WRONG_CREDENTIALS);
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if(!isPasswordValid) {
        throw new UserInputError(WRONG_CREDENTIALS);
    }

    user.lastLogin = Date.now();
    await UserModel.findByIdAndUpdate(user);
    return getToken(user._id, user.roles);
  }

}