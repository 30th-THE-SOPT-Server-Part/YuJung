import express, { Request, Response } from "express";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import UserService from "../services/UserService";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";

/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
const createUser = async (req: Request, res: Response) => {
    const userCreateDto: UserCreateDto = req.body; // User Create Dto 로 req.body 받아옴

    try {
        // 비즈니스 로직으로 req를 보내고 리턴받아온 데이터
        const data = await UserService.createUser(userCreateDto); 

        // 위의 데이터로 response 보내줌
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data));
    } catch (error) {
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route PUT /user/:userId
 *  @desc Update User
 *  @access Public
 */
const updateUser = async (req: Request, res: Response) => {
    // req.body에서 받아온 데이터 UserUpdateDto로 객체 가공
    const userUpdateDto: UserUpdateDto = req.body;
    const { userId } = req.params;

    try {
        // 가공된 데이터 UserService로 보내서 비즈니스 로직 처리
        await UserService.updateUser(userId, userUpdateDto);

        // 반환 값이 없으므로 204 리턴
        res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route GET /user/:userId
 *  @desc READ User
 *  @access Public
 */
const findUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const data = await UserService.findUserById(userId);

        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.FIND_USER_SUCCESS, data));

    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route DELETE /user/:userId
 *  @desc Delete User
 *  @access Public
 */
const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        await UserService.deleteUser(userId);

        res.status(statusCode.NO_CONTENT).send(); //204
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser
}