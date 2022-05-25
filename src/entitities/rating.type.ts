import { ObjectType, Field, Authorized } from "type-graphql";
import { prop as Prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose"
import { ObjectId } from "mongodb"
import { BaseEntity } from "./baseEntity.type";

@ObjectType()
export class Rating extends BaseEntity{

  @Prop({required: true})
  @Field()
  rating: number;

  @Prop({required: true})
  @Field()
  userId: ObjectId;

  @Prop({required: true})
  @Field()
  courseId: ObjectId;
}

export const RatingModel = getModelForClass(Rating, { schemaOptions: { timestamps: true }})