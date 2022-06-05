import express, { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import ReviewService from "../services/ReviewService";
import { ReviewOptionType } from "../interfaces/review/ReviewOptionType";
const { validationResult } = require('express-validator');

/**
 * @route POST /review/movies/:movieId
 * @desc Create Review
 * @access Public
 */

const createReview = async (req: Request, res: Response) => {
    const error = validationResult(req);
    
    // express-validator에서 지정한대로 검사하여 error 검증
    if (!error.isEmpty()) {
        return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.BAD_REQUEST));
    }

    // 계층간 주고받을 데이터, params로 받아온 movieId
    const ReviewCreateDto: ReviewCreateDto = req.body;
    const { movieId } = req.params;

    try {
        // 리뷰 로직 호출
        const data = await ReviewService.createReview(movieId, ReviewCreateDto);
        
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_REVIEW_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.SERVICE_UNAVAILABLE).send(util.fail(statusCode.SERVICE_UNAVAILABLE, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route GET /review/movies/:movieId
 * @desc Get Review
 * @access Public
 */
const getReviews = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const data = await ReviewService.getReviews(movieId);

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_REVIEW_SUCCESS, data))
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};

const getReviewsBySearch = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { search, option } = req.query;

    const isOptionType = (option: string): option is ReviewOptionType => {
        return ["title", "content", "title_content"].indexOf(option) !== -1;
    }

    console.log(isOptionType(option as string));

    if (!isOptionType(option as string)) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const page: number = Number(req.query.page || 1);

    try {
        const data = await ReviewService.getReviewsBySearch(movieId, search as string, option as ReviewOptionType, page);

        if (!data) res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.SEARCH_REVIEW_NO_RESULT));

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SEARCH_REVIEW_SUCCESS,data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }


}

export default {
    createReview,
    getReviews,
    getReviewsBySearch,
}