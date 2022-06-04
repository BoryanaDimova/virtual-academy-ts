import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import { TypegooseMiddleware } from "./typegoose-middleware";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "./object-id.scalar";
import { authChecker} from "./auth/auth.checker"; 

import * as path from "path"
import { CourseResolver } from "./resolvers/course.resolver";
import { AuthResolver } from "./auth/auth.resolver";
import { RatingResolver } from "./resolvers/rating.resolver";

export const getSchema = async () => {
    const schema = await buildSchema({
        resolvers: [
            UserResolver, 
            CourseResolver, 
            RatingResolver,
            AuthResolver,
        ],
        dateScalarMode: "isoDate",
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        validate: true,
        // use document converting middleware
        globalMiddlewares: [TypegooseMiddleware],
        // use ObjectId scalar mapping
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
        authChecker,
      });
    return schema
}