import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import User from "../models/user";

const createUser = async (userCreateDto: UserCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const user = new User({
            name: userCreateDto.name,
            phone: userCreateDto.phone,
            email: userCreateDto.email,
            age: userCreateDto.age,
            school: {
                name: userCreateDto.school?.name,
                major: userCreateDto.school?.major
            }
        });

        // 새 document 생성해서 저장하기
        await user.save();

        // 반환 값 가공 (db에 저장된 document id값 가져오기)
        const data = {
            _id: user.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUser = async (userId: string, userUpdateDto: UserUpdateDto) => {
    try {
        // findByIdAndUpdate
        await User.findByIdAndUpdate(userId, userUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// db에 저장되어 있는 user document를 조회
const findUserById = async (userId: string): Promise<UserResponseDto | null> => {
    try {
        // mongoose의 functions findById() 사용
        const user = await User.findById(userId);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteUser = async (userId: string): Promise<void> => {
    try {
        // mongoose의 function findByIdAndDelete() 사용
        await User.findByIdAndDelete(userId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser
}