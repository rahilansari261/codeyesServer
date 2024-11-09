import mongoose from "mongoose";


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB connected successfully");

    } catch (err) {
        console.log(err.message);

    }
}


export default dbConnection