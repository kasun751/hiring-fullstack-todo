/**
 * Connects the application to MongoDB using Mongoose.
 *
 * - Uses MONGO_URI from environment variables
 * - Establishes a connection to the database
 * - Logs success or failure status
 * - Exits the process if connection fails (prevents app running without DB)
 */
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;