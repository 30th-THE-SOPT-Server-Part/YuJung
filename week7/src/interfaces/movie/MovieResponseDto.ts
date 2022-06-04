import mongoose from "mongoose";
import { MovieCommentInfo } from "./MovieInfo";

export interface MovieResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
    title: String;
    director: String;
    startDate?: Date;
    thumbnail?: String;
    story?: String;
    comments?: MovieCommentInfo[];
};