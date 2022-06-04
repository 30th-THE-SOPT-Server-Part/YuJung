import { Router } from "express";
import { FileController} from "../controllers";
import upload from "../config/multer"; // 파일 업로드 미들웨어

const router: Router = Router();

// router.post('/upload', upload.single('file'), FileController.uploadFileToS3);
router.post('/upload', upload.array('file'), FileController.uploadFilesToS3);

export default router;
