import mongoose from "mongoose";
import { UserCreateDto } from "./UserCreateDto";


// UserCreateDto와 같은 field를 공유하므로 extends
export interface UserResponseDto extends UserCreateDto {
    _id: mongoose.Schema.Types.ObjectId;
}