import express from 'express';

import { isLoggedInAPI } from '../../guard';
import '../../session'
import {UserController} from '../controller/userController';


export let userRoutes = express.Router();

export type User={
    username: string
    password: string
}


let userController = new UserController()

userRoutes.post('/signup', userController.signup)
userRoutes.post('/login', userController.login)
userRoutes.post('/logout', isLoggedInAPI,userController.logout)
userRoutes.get('/getUser', isLoggedInAPI,userController.getUser)