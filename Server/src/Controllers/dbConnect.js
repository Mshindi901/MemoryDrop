import AppDataSource from "./dbConfig.js";
import "reflect-metadata";

const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Postgres Connected Successfully");
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;