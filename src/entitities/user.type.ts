import { ObjectType, Field, Authorized } from "type-graphql";
import { prop as Prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";
import { BaseEntity } from "./baseEntity.type";
import { UserRoles } from "../auth/user.roles";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })

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

  @Field(type => [String])
  @Prop({default: [UserRoles.USER]})
  roles?: string[]
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true }})