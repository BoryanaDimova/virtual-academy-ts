import { ObjectId } from "mongoose";
import { ObjectType } from "type-graphql";
import { IBaseEntity } from "./baseEntity.interface";


@ObjectType({ implements: IBaseEntity })
export class BaseEntity implements IBaseEntity {
  id: ObjectId;
}