import { MaxLength, MinLength, IsEmail } from "class-validator";
import { ObjectId } from "mongoose";
import { Field, InputType } from "type-graphql";
import { Course } from "../entitities/course.type";


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

  @Field()
  userId: ObjectId;
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