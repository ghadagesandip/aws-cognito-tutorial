<<<<<<< HEAD:src/user.contrller.ts
import express from "express";
import { registerUser, signInUser, confirmUser } from './cognito-service';
=======
import express, { Router, Application } from "express";
import { registerUser, signInUser, confirmUser } from '../../utils/cognito-service';
import userModel from './user.model';
>>>>>>> 190c2b2e3667442efc4b7f3a3ac3759b229cb862:src/modules/user/user.controller.ts

interface IUserController {
  initRoute: Function,
  signUp: express.Handler,
  confirmEmailAddress: express.Handler,
  signIn: express.Handler,
  getProfile: express.Handler,
}


const userController: IUserController = {
  initRoute: () => {
    const router = express.Router()
    router.post('/signup', userController.signUp);
    router.post('/confirm', userController.confirmEmailAddress);
    router.post('/signin', userController.signIn);
    router.get('/profile', userController.getProfile);
    return router
  },

  signUp : async (req, res) => {
      const { password, gender, name, email } = req.body;
      const result = { password, gender, name, email };
      registerUser(result).then(rs =>{
        res.json({ message: `${result.name} user is created.`, data: rs});
      }).catch(err=>{
        res.status(500).json({ error: err.message });
      })
  },

  confirmEmailAddress: async(req, res) => {
    
    confirmUser(req.body).then(rs =>{
      res.json({ message: `user confirmed`});
    }).catch(err=>{
      res.status(500).json({ error: err.message });
    })
  },

 
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result ={ email, password };
      signInUser(result).then(
        data =>{
          res.json(data);
        }
      )
      .catch(err=>{
        res.status(500).json(err);
      })
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  getProfile: (req, res) => {
    res.json({});
  },
};

export default userController;