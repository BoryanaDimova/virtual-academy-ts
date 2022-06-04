import { Resolver, Query, Mutation, Args, Ctx } from "type-graphql";
import bcryptjs from "bcryptjs"
import { UserInputError, AuthenticationError } from "apollo-server-core";
import { Context } from "./context";
import { User, UserModel } from "../entitities/user.type";
import { LoginArguments } from "./auth.input";
import { getToken } from "./token";
@Resolver()
export class AuthResolver {

  @Query(returns => User)
  async currentUser(@Ctx() ctx: Context):Promise<User> {
    if(!ctx.user) {
        throw new AuthenticationError('user_not_authenticated');
    }
    return await UserModel.findById(ctx.user.id)
  }


  @Mutation(returns => String)
  async login(@Args(){email, password}: LoginArguments) {
    
    const user = await UserModel.findOne({email})
    if(!user) {
        throw new UserInputError('Wrong email or password');
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if(!isPasswordValid) {
        throw new UserInputError('Wrong email or password');
    }

    user.lastLogin = Date.now()
    await user.save();
    return getToken(user._id, user.roles);
  }

}