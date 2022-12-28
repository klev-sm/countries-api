import * as dotenv from "dotenv";

import express from "express";
import { router } from "./routes/router";
import path from "path";

const directory = path.resolve(process.cwd(), "../../.env");
dotenv.config({ path: directory });

export class App {
    public server: express.Application;
    public port: string;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
        this.port = process.env.PORT || "5000";
    }

    private middleware() {
        this.server.use(express.json());
    }

    private router() {
        this.server.use(router);
    }
}
