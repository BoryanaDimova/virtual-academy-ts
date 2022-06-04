import { MinLength, IsEmail, MaxLength } from "class-validator";
import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class LoginArguments {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}