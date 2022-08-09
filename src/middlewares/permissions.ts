import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse";
import { Request, Response, NextFunction } from 'express';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const AuthorizationHeader = req.header("Authorization");
    if (!AuthorizationHeader) {
        next(new ErrorResponse(`Access Denied`, 401));
    }

    const token = AuthorizationHeader!.split(" ")[1];

    // checking for TOKEN_SECRET from env
    if (process.env.TOKEN_SECRET === undefined) {
        return next(new ErrorResponse("please provide a secret for jwt"))
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        next(new ErrorResponse(`Invalid Token`, 401));
    }
};

export const checkRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role === role) {
            next();
        } else {
            next(new ErrorResponse(`Don't have permission`, 401));
        }
    };
};

