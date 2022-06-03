import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../config";
import { JwtPayLoadInfo } from "../interfaces/common/JwtPayLoadInfo";

const getToken = (userId: mongoose.Schema.Types.ObjectId): string => {
    const payload: JwtPayLoadInfo = {
        user: {
            id: userId
        },
    };

    const accessToken: string = jwt.sign( // jwt.sign(): 암호화
        payload,
        config.jwtSecret,
        //{ expiresIn: '2h' }, //유효기간
    );

    return accessToken;
};

export default getToken;