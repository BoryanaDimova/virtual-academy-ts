import { MaxLength, MinLength, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { User } from "../entitities/user.type";

@InputType()
export class CreateUserInput implements Partial<User>{
  @Field()
  @MaxLength(30)
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}