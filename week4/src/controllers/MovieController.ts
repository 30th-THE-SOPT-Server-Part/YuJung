import express, { Request, Response } from "express";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import MovieService from "../services/MovieService";
import { validationResult } from "express-validator";

/**
 * @route POST /movie
 * @desc Create Movie
 */
const createMovie = async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    };

    const MovieCreateDto: MovieCreateDto = req.body;

    try {
        const data = await MovieService.createMovie(MovieCreateDto);

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.CREATE_MOVIE_SUCCESS, data));        
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route GET /movie/:movieId
 * @desc Get Movie
 */
const getMovie = async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    };
    
    const { movieId } = req.params;

    try {
        const data = await MovieService.getMovie(movieId);

        if (!data) {
            // 조회는 성공하였으나 결과가 없는 경우 204 리턴
            res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.FIND_MOVIE_SUCCESS, data));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route PUT /movie/:movieId
 * @desc Update Movie
 */
const updateMovie = async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    };

    const { movieId } = req.params;
    const MovieUpdateDto: MovieUpdateDto = req.body;

    try {
        const data = await MovieService.updateMovie(movieId, MovieUpdateDto);

        if (!data) {
            // movieId가 잘못되었을 경우
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_MOVIE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route DELETE /movie/:movieId
 * @desc Delete Movie
 */
const deleteMovie = async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    };

    const { movieId } = req.params;

    try {
        await MovieService.deleteMovie(movieId);

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.DELETE_MOVIE_SUCCESS));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};

export default {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
};