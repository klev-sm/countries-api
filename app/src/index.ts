import { App } from "./App";
const port: string = process.env.PORT || "5000";

new App().server.listen(port, () => {
    console.log("Server running succesfully on port " + port);
});
