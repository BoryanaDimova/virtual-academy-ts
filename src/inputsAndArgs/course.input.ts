import { Ref } from "@typegoose/typegoose";
import { MaxLength, MinLength, IsEmail } from "class-validator";
import { ObjectId, Types } from "mongoose";
import { Field, InputType } from "type-graphql";
import { Course } from "../entitities/course.type";
import { User } from "../entitities/user.type";


@InputType()
export class CreateCourseInput implements Partial<Course>{
  @Field()
  @MaxLength(50)
  title: string;

  @Field()
  @MaxLength(255)
  description: string;

  @Field()
  imageUrl: string;
}

@InputType()
export class UpdateCourseInput implements Partial<Course>{
  @Field({ nullable: true })
  @MaxLength(50)
  title?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  description?: string;

  @Field({ nullable: true })
  imageUrl?: string;
}