import { MovieInfo } from "../movie/MovieInfo";
import mongoose from "mongoose";

export interface ReviewResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
    writer: string | mongoose.Types.ObjectId;
    movie: MovieInfo | mongoose.Types.ObjectId;
    title: string;
    content: string;
}