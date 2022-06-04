import {ObjectId} from "mongodb"
import { ObjectType } from "type-graphql";
import { IBaseEntity } from "./baseEntity.interface";


@ObjectType({ implements: IBaseEntity })
export class BaseEntity implements IBaseEntity {
  _id: ObjectId;
}