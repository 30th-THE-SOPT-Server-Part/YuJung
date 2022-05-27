import mongoose from "mongoose";
import { MovieInfo } from "../interfaces/movie/MovieInfo";

const MovieSchema = new mongoose.Schema ( {
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
    },
    thumbnail: {
        type: String,
    },
    story: {
        type: String
    }
});

export default mongoose.model<MovieInfo & mongoose.Document> ("movie", MovieSchema);
// mongoose.model을 해줌으로써 스키마 등록
// mongoose.model을 대문자 "Movie"로 저장하면 인식을 못한다. 왜일까?? mongodb에는 소문자로 저장되어서..?