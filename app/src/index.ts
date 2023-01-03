import { App } from "./App.js";

// starting server
const appConnection = new App();
appConnection.server.listen(appConnection.port, () => {
    console.log("Mongo connection: " + process.env.MONGODB_PASSWORD);
    console.log("Server succesfully running on port " + appConnection.port);
});
