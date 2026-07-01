import express from "express";
import { getUserById, getUserResumes, loginUser, registerUser } from "../controller/userController.js";
import protect from "../middlewares/authMiddleWare.js"

const userRouter = express.Router();

userRouter.post('/register' , registerUser);
userRouter.post('/login' , loginUser);
userRouter.get('/data' , protect , getUserById);
userRouter.get('/resumes' , protect , getUserResumes);

export default userRouter;
