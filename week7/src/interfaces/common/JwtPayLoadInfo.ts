import mongoose from "mongoose";

export interface JwtPayLoadInfo {
    user: {
        id: mongoose.Schema.Types.ObjectId
    }
}