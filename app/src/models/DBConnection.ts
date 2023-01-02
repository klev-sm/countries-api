import mongoose from "mongoose";

// creating singleton to get a single database connection
export class DBConnection {
    protected static db: mongoose.Connection;

    public static async getInstance() {
        if (!this.db) {
            this.db = new DBConnection().connectToDatabase();
        }
        return this.db;
    }

    private connectToDatabase() {
        mongoose.set("strictQuery", false);
        mongoose.connect(
            `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster-countries.0uaijgp.mongodb.net/countrie-api`
        );
        const databaseConnection = mongoose.connection;
        return databaseConnection;
    }
}
