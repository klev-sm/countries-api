import { App } from "./App.js";
import dbConnection from "./config/DBConnection.js";

async function setup() {
    // creating connection with database
    const db = await dbConnection();
    if (!db) {
        return;
    }

    // starting server
    const appConnection = new App();
    appConnection.server.listen(appConnection.port, () => {
        console.log("Server succesfully running on port " + appConnection.port);
    });
}

setup();
