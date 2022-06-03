import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator/check";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post('/', [
    // express-validator로 req.body 검증
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty(),
    body('phone').notEmpty()
], UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);
router.post('/signin', [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 6 })
], UserController.signInUser)

export default router;