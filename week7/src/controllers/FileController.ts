/**
 * Express.Multer.file
 * Express.MulterS3.file 얘로 받아오도록 명시해줘야함
 */

 import express, { Request, Response } from "express";
 import message from "../modules/responseMessage";
 import statusCode from "../modules/statusCode";
 import util from "../modules/util";
 import FileService from "../services/FileService";
 
 
 /**
  * @route POST /file/upload
  * @desc Upload Single File To S3
  */
 const uploadFileToS3 = async ( req: Request, res: Response) => {
     if (!req.file) return res.status(statusCode.BAD_REQUEST). send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
 
     const image: Express.MulterS3.File = req. file as Express.MulterS3.File;
     const { location, originalname } = image;
 
     try {
         const data = await FileService.createFile(location, originalname);

         res.status(statusCode.OK).send(util.success(statusCode.OK, message.CREATE_FILE_SUCCESS, data));
     } catch (error) {
         console.log(error);
         res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
     }
 }

/**
 * @route POST /file/upload
 * @desc Upload Multiple Files To S3
 */
 const uploadFilesToS3 = async (req: Request, res: Response) => {
     if (!req.files) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

     const images: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];
    try{
        const imageList: {
            location: string;
            originalname: string;
        }[] = await Promise.all(images.map((image: Express.MulterS3.File) => {
            return {
                location: image.location,
                originalname: image.originalname
            }
        }));

        const data = await FileService.createFiles(imageList);

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.CREATE_FILES_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
 };

 export default {
    uploadFileToS3,
    uploadFilesToS3,
 }