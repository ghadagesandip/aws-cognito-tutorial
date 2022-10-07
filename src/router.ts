<<<<<<< HEAD
import { Router} from "express";
import userController from "./user.contrller";
const router = Router();
router.post('/signup', userController.signUp);
router.post('/confirm', userController.confirmEmailAddress);
router.post('/signin', userController.signIn);
router.get('/profile', userController.getProfile);
export default router;
=======
import { Application, Router} from "express";
import userController from "./modules/user/user.controller";
import roleController from "./modules/role/role.controller";


export default function registerRoutes(app:Application) {
    app.use('/api/users', userController.initRoute());
    app.use('/api/roles', roleController.initRoute());

}
  
>>>>>>> 190c2b2e3667442efc4b7f3a3ac3759b229cb862
