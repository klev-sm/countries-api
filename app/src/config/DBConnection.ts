import mongoose, { Connection } from "mongoose";

// creating singleton to get a single database connection
export class DBConnection {
    protected static db: mongoose.Connection;

    public static async getInstance() {
        if (!this.db) {
            this.db = await new DBConnection().connectToDatabase();
        }
        return this.db;
    }

    private async connectToDatabase(): Promise<Connection> {
        mongoose.set("strictQuery", false);
        try {
            const databaseConnection = await mongoose.connect(
                `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster-countries.0uaijgp.mongodb.net/countrie-api`
            );

            return databaseConnection.connection;
        } catch (error) {
            console.log("aq");
            throw new Error(error);
        }
    }
}
