import jsonwebtoken from "jsonwebtoken"
import { ObjectId } from "mongodb"
import dotenv from "dotenv";
import { User, UserModel } from "../entitities/user.type";

dotenv.config();

export function getToken(_id: ObjectId, roles: string[]) {

    return jsonwebtoken.sign(
        {
            _id,
            roles,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRATION ?? '1d'
        }
    )

}

export async function getUserFromToken(token: String): Promise<User> {
    const tokenPart = token.replace('Bearer ', '');
    let userId =  jsonwebtoken.verify(tokenPart, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
          /*
            err = {
              name: 'NotBeforeError',
              message: 'jwt not active',
              date: 2018-10-04T16:10:44.000Z
            }
          */
        }
        return decoded._id;
    });
    return UserModel.findById(userId);
}