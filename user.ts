import express from 'express';
import { knex } from './db'
import {UserController} from './user.controller';
import {UserService} from './user.service';

export let userRoutes = express.Router();

export type User={
    username: string
    password: string
}

let UserService = new UserService(knex)
let UserController= new UserController(UserService)

userRoutes.post()