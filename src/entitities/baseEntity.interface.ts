import { ObjectId } from "mongoose";
import { Field, InterfaceType } from "type-graphql";


@InterfaceType()
export abstract class IBaseEntity {
    @Field()
    readonly id: ObjectId;
}