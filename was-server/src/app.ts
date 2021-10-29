import express from 'express';
import Router from "./router";
import { config as dotEnvConfig } from 'dotenv'
import Database from "./database";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/errorMiddleware";

dotEnvConfig();

const port = 3000;
const app = express();

Database.connect().then(() => {

    const router = new Router();
    app.use(bodyParser.json());

    app.use('/', router.get());
    app.use(errorMiddleware);

    app.listen(port, () => console.log(`was-server listening on port ${port}`));

}).catch(error => {
    console.log(error);
});