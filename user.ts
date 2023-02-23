import express from 'express';
import { Client } from 'pg';
import { knex } from './db'
import './session'
import {UserController} from './user.comtroller';
import {UserService} from './user.service';

export let userRoutes = express.Router();

export type User={
    username: string
    password: string
}

let userController = new UserController()

userRoutes.post('/signup', UserController.signup)
userRoutes.post('/login', UserController.login)
userRoutes.post('/logout', UserController.logout)