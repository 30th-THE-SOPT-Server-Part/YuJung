import { Router } from "express";
import { MovieController } from "../controllers";
import { body, param } from "express-validator";

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

export default router;