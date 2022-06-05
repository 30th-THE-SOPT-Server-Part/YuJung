import mongoose from "mongoose";

export interface MovieCommentCreateDto {
    writer: string | mongoose.Types.ObjectId;
    comment: string;
}