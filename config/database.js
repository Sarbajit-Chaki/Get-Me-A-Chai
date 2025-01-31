import mongoose from "mongoose";

const connection = {};

export const connectDB = async () => {
    if(connection.isConnected) {
        console.log("Using existing connection");
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "GetMeAChai",
        });
        connection.isConnected = conn.connections[0].readyState;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}