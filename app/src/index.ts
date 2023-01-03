import { App } from "./App.js";
import { DBConnection } from "./config/DBConnection.js";

async function setup() {
    // creating connection with database
    const db = await DBConnection.getInstance();

    db.on("error", () => {
        console.log.bind(console, "Failed to connect to the database.");
    }).once("open", () => {
        console.log("Sucessfully connected to the database.");
    });

    // starting server
    const appConnection = new App();
    appConnection.server.listen(appConnection.port, () => {
        console.log("Server succesfully running on port " + appConnection.port);
    });
}

setup();
