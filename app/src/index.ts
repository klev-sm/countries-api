import { App } from "./models/App";
import { DBConnection } from "./models/DBConnection";

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
        console.log("Server running succesfully on port " + appConnection.port);
    });
}

setup();
