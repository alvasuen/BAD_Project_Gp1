import express from "express";
import { Knex } from "knex";
import "../../session";

export class ProfileService {
  constructor(private knex: Knex) {}

  getProfileNameByUserId = async (userId: number) => {
    return await this.knex
      .select("username")
      .from("users")
      .where("users_id", userId);
  };

  getProfilePlaylist = async (userId: number) => {
    return await this.knex
      .select("*")
      .from("playlists")
      .where("users_id", userId);
  };

  getProfilePlaylistSongId = async (playlistId: number) => {
    return await this.knex("playlists_songs")
      .select("*")
      .innerJoin(
        "playlists",
        "playlists_songs.playlists_id",
        "playlists.playlists_id"
      )
      .innerJoin("songs", "playlists_songs.songs_id", "songs.songs_id")
      .where("playlists_songs.playlists_id", playlistId);
  };
  //SQL:
  //select * from playlists_songs inner join playlists on playlists_songs.playlists_id = playlists.playlists_id inner join songs on playlists_songs.songs_id = songs.songs_id;
}
