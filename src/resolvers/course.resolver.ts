
import { ObjectId } from "mongoose";
import { Resolver, FieldResolver, Root, Query, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import { Context } from "../auth/context";
import { UserRoles } from "../auth/user.roles";
import { Course, CourseModel } from "../entitities/course.type";
import { Rating, RatingModel } from "../entitities/rating.type";
import { User, UserModel } from "../entitities/user.type";
import { CreateCourseInput, UpdateCourseInput } from "../inputsAndArgs/course.input";
import { RatingInput } from "../inputsAndArgs/rating.input";
import { ObjectIdScalar } from "../object-id.scalar";


@Resolver(of => Course)
export class CourseResolver {
    @Query(returns => [Course])
    async courses():Promise<Course[]> {
      return await CourseModel.find({})
    }
  
    @Query(returns => Course)
    async course(@Arg("_id", type => ObjectIdScalar) _id: ObjectId):Promise<Course> {
      return await CourseModel.findById(_id);
    }
  
    @Authorized()
    @Mutation(returns => Course)
    async createCourse(
      @Arg("course") courseInput: CreateCourseInput, 
      @Ctx() { user }: Context):Promise<Course> {
      const courseData = {...courseInput, creator: user._id};  
      const newCourse = new CourseModel(courseData);

      await newCourse.save();
      return newCourse;
    }
  
    @Mutation(() => Course)
    async updateCourse(@Arg("_id", type => ObjectIdScalar) _id: ObjectId, @Arg("data") data: UpdateCourseInput) {
      return await CourseModel.findByIdAndUpdate(_id, data, {new: true});
    }

    @Authorized([UserRoles.ADMIN])
    @Mutation(returns => Course)
    async deleteCourse(@Arg("_id", type => ObjectIdScalar) _id: ObjectId):Promise<Course> {
        return await CourseModel.findByIdAndRemove(_id);
    }

    @Authorized()
    @Mutation(returns => Course)
    async rate(@Arg("rate") rateInput: RatingInput, @Ctx() { user }: Context): Promise<Course> {

      const course = await CourseModel.findById(rateInput.courseId);
      if (!course) {
        throw new Error("Invalid course ID");
      }

      let existingRating = course.ratings.find(r => ObjectIdScalar.serialize(r.user) == user._id);
    
      if(existingRating){
        existingRating.rating = rateInput.rating;

      } else{
        const rateData = {
          ...rateInput,
          user: user._id
        };
  
        const rate = new RatingModel(rateData);
        course.ratings.push(rate);
      }

      await course.save();
      return course;
    }
  
    @FieldResolver()
    async creator(@Root() course: Course): Promise<User> {
      return (await UserModel.findById(course.creator))!;
    }

    @FieldResolver()
    averageRating(@Root() course: Course): number {
      return course.ratings.reduce((a, b) => (a + b.rating), 0) / course.ratings.length;
    }

}

