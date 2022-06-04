import { ObjectId } from "mongoose";
import { Field, InputType, Int } from "type-graphql";


@InputType()
export class RatingInput implements Partial<RatingInput>{
    @Field(type => Int)
    rating: number;
  
    @Field()
    courseId: ObjectId;
}