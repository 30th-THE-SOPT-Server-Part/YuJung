import express, { Request, Response } from "express";
import { BlogCreateDto } from "../interfaces/blog/BlogCreateDto";
import { BlogUpdateDto } from "../interfaces/blog/BlogUpdateDto";
import { BlogService } from "../services";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";

/**
 * @route POST /blog
 * @desc Create Blog
 * @access Public
 */
const createBlog = async (req: Request, res: Response) => {
    const blogCreateDto: BlogCreateDto = req.body;

    try {
        const data = await BlogService.createBlog(blogCreateDto);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_BLOG_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route PUT /blog/:postId
 * @desc Update Blog
 * @access Public
 */
const updateBlog = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const blogUpdateDto: BlogUpdateDto = req.body;

    try {
        await BlogService.updateBlog(postId, blogUpdateDto);

        res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route POST /blog/:postId
 * @desc find POST
 * @access Public
 */
const findBlogById = async (req:Request, res: Response) => {
    const { postId } = req.params;

    try {
        const data = await BlogService.findBlogById(postId);

        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.FIND_BLOG_SUCESS, data));
    
    } catch (error) {
        console.log(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const deleteBlog = async (req: Request, res: Response) => {
    const { postId } = req.params;

    try {
        await BlogService.deleteBlog(postId);

        res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}


export default {
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog
};