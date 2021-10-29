import express from 'express';
import AuthenticationService from "../services/authenticationService";

export default class AuthenticationController {

    authenticationService: AuthenticationService;

    constructor() {
        this.authenticationService = new AuthenticationService();
    }

    login = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.json(this.authenticationService.getToken());
        } catch (err) {
            return next(err);
        }
    }
}