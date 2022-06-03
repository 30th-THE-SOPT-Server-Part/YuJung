import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import util from "../modules/util";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";

export default (req: Request, res: Response, next: NextFunction) => {
    //request-header에서 토큰 받아오기
    const token = req.headers["authorization"]?.split(' ').reverse()[0];

    //토큰값이 리퀘에 없는 경우
    if (!token) {
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.NULL_VALUE_TOKEN));
    };

    //토큰 검증
    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        req.body.user = (decoded as any).user;

        next();
    } catch (error: any) {
        console.log(error);
        // 토큰이 만료되어 에러가 나는 경우
        if (error.name === 'TokenExpiredError') {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
        }
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};