import express, { Request, Response } from "express";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import MovieService from "../services/MovieService";
import { validationResult } from "express-validator";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";

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

/**
 * @route POST /movie/:movieId
 * @desc create movie comment
 * @access Publics
 */
const createMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST))
    };

    const MovieCommentCreateDto: MovieCommentCreateDto = {
        writer: req.body.user.id, // auth를 사용하여 user의 object id를 받아와서 writer값으로 넣어줌
        comment: req.body.comment
    }
    const { movieId } = req.params;

    try {
        const data = await MovieService.createMovieComment(movieId, MovieCommentCreateDto);
        if (!data) return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.CREATE_MOVIE_COMMENT_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};

const updateMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const { movieId, commentId } = req.params;
    const MovieCommentUpdateDto: MovieCommentUpdateDto = req.body;
    const userId = req.body.user.id;

    try {
        const data = await MovieService.updateMovieComment(movieId, commentId, userId, MovieCommentUpdateDto);

        if (!data) {
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        };

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_MOVIE_COMMENT_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    createMovieComment,
    updateMovieComment,
};