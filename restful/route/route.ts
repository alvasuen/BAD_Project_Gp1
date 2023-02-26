import express from 'express';
import { isLoggedInAPI } from '../../guard';
import '../../session'
import { UserController } from '../controller/userController';
import { PlaylistsController } from '../controller/playListController';
import { knex } from '../../db';
import { PlaylistsService } from '../service/playListService';


export let userRoutes = express.Router();
export let playlistRoutes = express.Router();

export type User = {
    username: string
    password: string
}

let playListServices = new PlaylistsService(knex)
let userController = new UserController()
let playListController = new PlaylistsController(playListServices)

userRoutes.post('/signup', userController.signup)
userRoutes.post('/login', userController.login)
userRoutes.post('/logout', isLoggedInAPI, userController.logout)
userRoutes.get('/getUser', isLoggedInAPI, userController.getUser)

playlistRoutes.get('/', playListController.loadPlaylist)