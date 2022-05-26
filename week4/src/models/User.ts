import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    school: {
        name: { type: String },
        major: { type: String }
    }
});

export default mongoose.model<UserInfo & mongoose.Document>("user", UserSchema);
// mongoose.model을 대문자 "User"로 저장하면 인식을 못한다. 왜일까?? mongodb에는 소문자로 저장되어서..?