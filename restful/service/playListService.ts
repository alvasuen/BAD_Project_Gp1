import express from "express";
import { Knex } from "knex";
import "../../session";
let app = express();

export class PlaylistsService {
  constructor(private knex: Knex) {}
  getPlayListByUserId = async (userId: number) => {
    return await this.knex("playlists")
      .select("playlists.playlists_id")
      .where("users_id", userId);
  };

  loadPlaylist = async (id: number) => {
    return await this.knex("playlists")
      .select("playlists_name", "playlists.playlists_id", "created_at")
      .where("playlists.playlists_id", id)
      .innerJoin(
        "playlists_songs",
        "playlists.playlists_id",
        "playlists_songs.playlists_id"
      )
      .innerJoin("songs", "songs.songs_id", "playlists_songs.songs_id");
  };
}
