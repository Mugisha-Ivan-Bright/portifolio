import mongoose from "mongoose";

export async function connectDb(){
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log(connect.connection.host);
    } catch (error) {
        console.log(error);
    };
}