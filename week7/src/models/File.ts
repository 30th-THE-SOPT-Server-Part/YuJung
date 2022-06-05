import mongoose from "mongoose";
import { fileInfo } from "../interfaces/file/fileInfo";

const FileSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model<fileInfo & mongoose.Document>("File", FileSchema);