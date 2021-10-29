import { NextFunction, Request, Response } from 'express';
import {HttpError} from "http-errors";

//TODO differentiate between operational and http errors
export default function errorMiddleware(error: HttpError, request: Request, response: Response, next: NextFunction) {
    response.status(error.status).send({
        message: error.message
    });
}