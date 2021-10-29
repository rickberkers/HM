import jwt from "jsonwebtoken";
import { Token } from "../interfaces/token";

export default class AuthenticationService {

    getToken = (): Token => {
        try {
            let token = jwt.sign(
                {},
                process.env.ACCESS_TOKEN_SECRET as string,
                {
                    algorithm: "HS256",
                    expiresIn: process.env.ACCESS_TOKEN_LIFE
                }
            );
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
            return { token };
        } catch {
            throw new Error('The token could not be created');
        }
    };
}