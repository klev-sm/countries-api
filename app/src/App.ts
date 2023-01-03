import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import path from "path";

import countrieRoutes from "./routes/countrieRoutes.js";
import { DBConnection } from "./config/DBConnection.js";

// changing the dotenv directory in order to match the project directory
const directory = path.join(process.cwd(), ".env");
dotenv.config({ path: directory });

export class App {
    public server: express.Application;
    public port: string;

    constructor() {
        this.connectionToDatabase();
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

    private async connectionToDatabase() {
        // creating connection with database
        const db = await DBConnection.getInstance();
        if (db.readyState === 1) {
            console.log("Sucessfully connected to the database.");
        } else {
            console.log.bind(console, "Failed to connect to the database.");
        }

        if (!db) {
            return;
        }
    }
}
