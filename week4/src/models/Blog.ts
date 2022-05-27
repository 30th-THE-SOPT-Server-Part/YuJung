import mongoose from "mongoose";
import { BlogInfo } from "../interfaces/blog/BlogInfo";

const BlogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    contents: {
        type: String
    },
    date: {
        type: Date,
        required: true
    }
});

export default mongoose.model<BlogInfo & mongoose.Document>("Blog", BlogSchema);