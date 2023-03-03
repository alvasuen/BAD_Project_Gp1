import express from "express";
import { isLoggedInAPI } from "../../guard";
import "../../session";
import { UserController } from "../controller/userController";
import { PlaylistsController } from "../controller/playListController";
import { knex } from "../../db";
import { PlaylistsService } from "../service/playListService";
import { ProfileService } from "../service/profileService";
import { ProfileController } from "../controller/profileController";
import { YtdlController } from "../controller/ytdlController";
import { YtdlService } from "../service/ytdlService";
import{ StatusController } from "../controller/statusController";
import { StatusService } from "../service/statusService";


export let userRoutes = express.Router();
export let playlistRoutes = express.Router();
export let profileRoutes = express.Router();
export let ytdlRoutes = express.Router();
export let statusRoutes = express.Router();

export type User = {
  username: string;
  password: string;
};

let userController = new UserController();

let playListServices = new PlaylistsService(knex);
let playListController = new PlaylistsController(playListServices);

let profileService = new ProfileService(knex);
let profileController = new ProfileController(profileService);

let ytdlService = new YtdlService(knex);
let ytdlController = new YtdlController(ytdlService);

let statusService = new StatusService(knex);
let statusController = new StatusController(statusService);

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);
userRoutes.post("/logout", isLoggedInAPI, userController.logout);
userRoutes.get("/getUser", isLoggedInAPI, userController.getUser);

playlistRoutes.get("/all/:id", isLoggedInAPI, playListController.loadPlaylist);
playlistRoutes.get("/user", isLoggedInAPI, playListController.getPlayListByUser);

profileRoutes.get("/profile", profileController.loadProfile);

ytdlRoutes.post("/download", ytdlController.downloadVideo);

statusRoutes.get("/download/job_status", statusController.statusCheck);
