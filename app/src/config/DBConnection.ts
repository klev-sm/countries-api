import mongoose, { Connection } from "mongoose";

// creating singleton to get a single database connection
export default async function dbConnection(): Promise<Connection> {
    try {
        mongoose.set("strictQuery", false);
        const databaseConnection = await mongoose.connect(
            `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster-countries.0uaijgp.mongodb.net/countrie-api`
        );

        if (databaseConnection.connection.readyState === 1) {
            console.log("Sucessfully connected to the database.");
        } else {
            console.log("Failed to connect to the database.");
        }

        return databaseConnection.connection;
    } catch (error) {
        throw new Error(error);
    }
}
