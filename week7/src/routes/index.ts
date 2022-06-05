//router index file
import { Router } from 'express';
import UserRouter from "./UserRouter";
import FileRouter from "./FileRouter";
import MovieRouter from "./MovieRouter";
import ReviewRouter from "./ReviewRouter";

const router: Router = Router();

router.use('/user', UserRouter);
router.use('/movie', MovieRouter);
router.use('/file', FileRouter);
router.use('/review', ReviewRouter);

export default router;