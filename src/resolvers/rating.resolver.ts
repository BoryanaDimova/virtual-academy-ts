import { Resolver, FieldResolver, Root } from "type-graphql";
import { Rating } from "../entitities/rating.type";
import { User, UserModel } from "../entitities/user.type";


@Resolver(of => Rating)
export class RatingResolver {

    @FieldResolver(returns => User)
    async creator(@Root() rating: Rating): Promise<User> {
      return (await UserModel.findById(rating.user));
    }

}

