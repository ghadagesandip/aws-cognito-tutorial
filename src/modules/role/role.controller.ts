import express, { Router, Response, Request } from "express";
import { registerUser, signInUser, confirmUser } from '../../utils/cognito-service';




const roleController = {
    
    initRoute: () => {
        const router = express.Router()
        router.get('/index', roleController.index);
        return router
    },

    index : async (req:Request, res: Response) => {
        
        res.json({ message: `role listing is working.`});
        
    },

};

export default roleController;