import { Application, Router} from "express";
import userController from "./modules/user/user.controller";
import roleController from "./modules/role/role.controller";


export default function registerRoutes(app:Application) {
    app.use('/api/users', userController.initRoute());
    app.use('/api/roles', roleController.initRoute());

}
  