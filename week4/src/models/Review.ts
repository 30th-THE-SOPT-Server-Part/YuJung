import mongoose from "mongoose";
import { ReviewInfo } from "../interfaces/review/reviewInfo"

const ReviewSchema = new mongoose.Schema ( {
    writer: {
        type: mongoose.Types.ObjectId, // objectId 참조
        required: true,
        ref: "user" // 참조 콜렉션
    },
    movie: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "movie"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
});

export default mongoose.model<ReviewInfo & mongoose.Document> ("review", ReviewSchema);