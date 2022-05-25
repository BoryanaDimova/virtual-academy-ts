import { ObjectType, Field, Authorized } from "type-graphql";
import { prop as Prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";
import { BaseEntity } from "./baseEntity.type";

@ObjectType()
export class User extends BaseEntity{

  @Prop({required: true})
  @Field()
  firstName: string;

  @Prop({required: true})
  @Field()
  lastName: string;

  @Prop({required: true})
  @Field()
  email: string;

  @Prop({required: true})
  @Field()
  password: string;

  @Field()
  @Prop({default: Date.now()})
  lastLogin?: number;

  @Field()
  @Prop({default: true})
  isActive?: boolean;

}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true }})