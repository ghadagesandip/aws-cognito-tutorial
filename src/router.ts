import { Router} from "express";
import userController from "./user.contrller";
const router = Router();
router.post('/signup', userController.signUp);
router.post('/confirm', userController.confirmEmailAddress);
router.post('/signin', userController.signIn);
router.get('/profile', userController.getProfile);
export default router;