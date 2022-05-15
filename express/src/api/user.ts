import express, { Request, Response, Router } from 'express';
// express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const router: Router = express.Router(); 
// express 모듈에서 라투어 가져와서 정의

router.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        status: 200,
        message: '유저 조회 성공'
    });
});
// /api/user/를 통해 get 요청이 들어오면 json 리턴

module.exports = router;