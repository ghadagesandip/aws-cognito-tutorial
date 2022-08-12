import express from "express";
import { registerUser, signInUser } from './cognito-service';

interface IUserController {
  signUp: express.Handler,
  signIn: express.Handler,
  confirmSignUp: express.Handler,
  getProfile: express.Handler,
}


const userController: IUserController = {
  signUp : async (req, res) => {
   
      const { password, gender, name, email } = req.body;
      const result = { password, gender, name, email };
      registerUser(result).then(rs =>{
        res.json({ message: `${result.name} user is created.`, data: rs});
      }).catch(err=>{
        res.status(500).json({ error: err.message });
      })
     
    
  },
  confirmSignUp: async (req, res) => {
    try {
      const { email, code } = req.body;
      const result = { email, code };
      res.json({ message: result });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
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