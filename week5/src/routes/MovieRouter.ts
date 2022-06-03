import { Router } from "express";
import { MovieController } from "../controllers";
import { body, param } from "express-validator";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post('/', [
    body('title').notEmpty(),
    body('director').notEmpty(),   
], MovieController.createMovie);

router.get('/:movieId', [
    param('movieId').notEmpty()
], MovieController.getMovie);

router.put('/:movieId', [
    param('movieId').notEmpty()
], MovieController.updateMovie);

router.delete('/:movieId', [
    param('movieId').notEmpty()
], MovieController.deleteMovie);

router.post('/:movieId/comment', [
    body('writer').notEmpty(),
    body('comment').notEmpty()
], auth, MovieController.createMovieComment)

router.put('/:movieId/comments/:commentId', [
    body('comment').notEmpty()
], auth, MovieController.updateMovieComment);

export default router;