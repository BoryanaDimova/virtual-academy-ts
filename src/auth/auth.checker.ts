import { AuthChecker } from "type-graphql";
import { Context } from "./context";

export const authChecker: AuthChecker<Context> = (
    { context: {user} },
    roles,
  ) => {

    if(!user) {
        return false;
    }

    if (roles.length === 0) {
        // if `@Authorized()`, check only if user exists
        return user !== undefined;
      }

    return user.roles.some(role => roles.includes(role))

};