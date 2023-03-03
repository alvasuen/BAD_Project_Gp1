import express from "express";
import { isLoggedInAPI } from "../../guard";
import "../../session";
import { UserController } from "../controller/userController";
import { PlaylistsController } from "../controller/playListController";
import { ProfileController } from "../controller/profileController";
import { YtdlController } from "../controller/ytdlController";
import { SearchController } from "../controller/searchController";
import { knex } from "../../db";
import { PlaylistsService } from "../service/playListService";
import { ProfileService } from "../service/profileService";
import { SearchService } from "../service/searchService";
import { YtdlService } from "../service/ytdlService";
import{ StatusController } from "../controller/statusController";
import { StatusService } from "../service/statusService";


export let userRoutes = express.Router();
export let playlistRoutes = express.Router();
export let profileRoutes = express.Router();
export let ytdlRoutes = express.Router();
export let searchRoutes = express.Router();
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

let searchService = new SearchService(knex);
let searchController = new SearchController(searchService);

//User login/logout
userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);
userRoutes.post("/logout", isLoggedInAPI, userController.logout);
userRoutes.get("/getUser", isLoggedInAPI, userController.getUser);

//Playlist
playlistRoutes.get("/all/:id", isLoggedInAPI, playListController.loadPlaylist);
playlistRoutes.get(
  "/user",
  isLoggedInAPI,
  playListController.getPlayListByUser
);

//Profile
profileRoutes.get("/profile", profileController.loadProfile);

//Youtube
ytdlRoutes.post("/download", ytdlController.downloadVideo);

//Search
searchRoutes.get("/singer", isLoggedInAPI, searchController.loadSinger);
searchRoutes.get("/area", isLoggedInAPI, searchController.loadArea);
searchRoutes.get("/language", isLoggedInAPI, searchController.loadArea);
// searchRoutes.get("/searchall", isLoggedInAPI, searchController.);

statusRoutes.get("/download/job_status", statusController.statusCheck);
