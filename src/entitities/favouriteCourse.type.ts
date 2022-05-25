import { ObjectType, Field, Authorized } from "type-graphql";
import { prop as Prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose"
import { ObjectId } from "mongodb"
import { BaseEntity } from "./baseEntity.type";

@ObjectType()
export class FavouriteCourse extends BaseEntity{
  
  @Prop({required: true})
  @Field()
  userId: ObjectId;

  @Prop({required: true})
  @Field()
  courseId: ObjectId;
}

export const FavouriteCourseModel = getModelForClass(FavouriteCourse, { schemaOptions: { timestamps: true }})