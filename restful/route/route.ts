import express from 'express';
import { Client } from 'pg';
import { knex } from '../../db'
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
userRoutes.post('/logout', userController.logout)
userRoutes.post('/getUser', userController.getUser)