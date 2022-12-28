import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import { router } from "./routes/router";

export class App {
    public server: express.Application;
    protected port: string;

    constructor() {
        this.server = express();
    }

    private middleware() {
        this.server.use(express.json());
    }

    private router() {
        this.server.use(router);
    }
}
