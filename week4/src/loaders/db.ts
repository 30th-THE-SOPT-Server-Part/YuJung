import mongoose from "mongoose";
import config from "../config";
import Movie from "../models/Movie";
import Review from "../models/Review";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);

        mongoose.set('autoCreate', true);

        console.log("Mongoose Connected ...");
    
        // 서버 실행과 동시에 빈 collection 생성
        Movie.createCollection().then(function(collection) {
            console.log("Movie Collection is created!");
        });

        Review.createCollection().then(function(collection) {
            console.log("Review Collection is created!")
        });
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;