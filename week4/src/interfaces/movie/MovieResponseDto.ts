import mongoose from "mongoose";

export interface MovieResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
    title: String;
    director: String;
    startDate: Date;
    thumbnail: String;
    story: String;
};