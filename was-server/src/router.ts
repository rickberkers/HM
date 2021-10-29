import express from 'express';

import { verifyToken } from './middleware/authenticationMiddleware';

import AuthenticationController from "./controllers/authenticationController";
import ItemController from "./controllers/itemController";

export default class Router {

    router: express.Router = express.Router();

    constructor() {
        const authenticationController = new AuthenticationController();
        const itemController = new ItemController();

        this.router.post('/login', authenticationController.login);
        this.router.get('/items', verifyToken, itemController.index);
        this.router.get('/items/:id', verifyToken, itemController.get);
        this.router.post('/items', verifyToken, itemController.create);
    }

    get = (): express.Router => {
        return this.router;
    }
}

