import {ObjectId} from "mongodb"
import { Field, InterfaceType } from "type-graphql";
import { ObjectIdScalar } from "../object-id.scalar";


@InterfaceType()
export abstract class IBaseEntity {
    @Field(type => ObjectIdScalar) // and explicitly use it
    _id: ObjectId;
}