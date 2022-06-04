import { ObjectId } from "mongoose";
import { Field, InputType, Int } from "type-graphql";
import { ObjectIdScalar } from "../object-id.scalar";


@InputType()
export class RatingInput implements Partial<RatingInput>{
    @Field(type => Int)
    rating: number;
  
    @Field(type => ObjectIdScalar)
    courseId: ObjectId;
}