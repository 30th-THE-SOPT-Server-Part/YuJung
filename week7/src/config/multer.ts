/**
 * 스토리지 명시를 위한 config 파일
 */

import multer from "multer";
import multerS3 from "multer-s3"
import config from ".";
import s3 from "./s3Config";

const upload = multer( { // 미들웨어로 사용할 multer 생성
    storage: multerS3({ // multer s3로 업로드할 위치 s3로 지정 및 상세 설정
        s3: s3,
        bucket: config.bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read', //사용할 권한
        key: function (req: Express.Request, file: Express.MulterS3.File, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        }
    }),
});

export default upload;