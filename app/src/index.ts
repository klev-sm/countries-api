import { App } from "./models/App";

const appConnection = new App();
appConnection.server.listen(appConnection.port, () => {
    console.log("Server running succesfully on port " + appConnection.port);
});
