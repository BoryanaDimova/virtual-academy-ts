import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { TypegooseMiddleware } from "./typegoose-middleware";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "./object-id.scalar";
// import { authChecker} from "./resolvers/auth/auth-checker"; 

import * as path from "path"

export const getSchema = async () => {
    const schema = await buildSchema({
        resolvers: [
            UserResolver
        ],
        dateScalarMode: "isoDate",
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        validate: true,
        // use document converting middleware
        globalMiddlewares: [TypegooseMiddleware],
        // use ObjectId scalar mapping
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
      });
    return schema
}