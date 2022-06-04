import { ObjectType, Field, Authorized, Int } from "type-graphql";
import { prop as Prop, getModelForClass, Ref } from "@typegoose/typegoose"
import { BaseEntity } from "./baseEntity.type";
import { User } from "./user.type";

@ObjectType()
export class Rating extends BaseEntity {

  @Prop({required: true})
  @Field(type => Int)
  rating: number;

  @Field(type => User)
  @Prop({ ref: User, required: true })
  user: Ref<User>;

}

export const RatingModel = getModelForClass(Rating, { schemaOptions: { timestamps: true }})