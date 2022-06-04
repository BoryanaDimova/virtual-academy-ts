import { ObjectType, Field, Float, Arg } from "type-graphql";
import { prop as Prop, getModelForClass, modelOptions, Severity, Ref } from "@typegoose/typegoose";
import { Rating } from "./rating.type";
import { Length } from "class-validator";
import { BaseEntity } from "./baseEntity.type";
import { User } from "./user.type";

@ObjectType()
export class Course extends BaseEntity{

  @Prop({required: true})
  @Field()
  title: string;

  @Prop({required: true})
  @Field()
  @Length(30, 255)
  description?: string;

  @Field()
  @Prop({default: Date.now()})
  datePublished?: Date;

  @Field()
  @Prop({default: "https://static.wikia.nocookie.net/marveldatabase/images/3/3f/No_Image_Cover.jpg/revision/latest?cb=20131012213713"})
  imageUrl?: string;

  @Field(type => [Rating])
  @Prop({ type: () => Rating, default: [] })
  ratings: Rating[];

  @Field(type => User)
  @Prop({ ref: User, required: true })
  creator: Ref<User>;
}

export const CourseModel = getModelForClass(Course, { schemaOptions: { timestamps: true }})