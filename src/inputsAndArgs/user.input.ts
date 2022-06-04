import { MaxLength, MinLength, IsEmail } from "class-validator";
import { Authorized, Field, InputType } from "type-graphql";
import { UserRoles } from "../auth/user.roles";
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
  @MaxLength(30)
  password: string;
}

@InputType()
export class UpdateUserInput implements Partial<User>{
  @Field({ nullable: true })
  @MaxLength(30)
  firstName: string;

  @Field({ nullable: true })
  @MaxLength(30)
  lastName: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @Authorized([UserRoles.ADMIN])
  @Field({ nullable: true })
  isActive?: boolean;
}