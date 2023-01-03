import * as dotenv from "dotenv";
import cors from "cors";

import express from "express";
import path from "path";
import countrieRoutes from "./routes/countrieRoutes.js";

// changing the dotenv directory in order to match the project directory
const directory = path.join(process.cwd(), ".env");
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
        this.server.use(cors());
    }

    private router() {
        // routes that will be used
        this.server.use(countrieRoutes);
    }
}
