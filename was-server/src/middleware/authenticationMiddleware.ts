import jwt from "jsonwebtoken";
import express from "express";

export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    try{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    }
    catch(e){
        return res.sendStatus(403);
    }

    next();
}