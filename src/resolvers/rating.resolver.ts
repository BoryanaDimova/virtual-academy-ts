import { Resolver, FieldResolver, Root, Query, Arg, Mutation, Ctx } from "type-graphql";
import { Course, CourseModel } from "../entitities/course.type";
import { Rating, RatingModel } from "../entitities/rating.type";
import { User, UserModel } from "../entitities/user.type";


@Resolver(of => Rating)
export class RatingResolver {
    @FieldResolver()
    async creator(@Root() rating: Rating): Promise<User> {
      return (await UserModel.findById(rating.user));
    }

}

