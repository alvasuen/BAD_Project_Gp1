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
    return await this.knex
      .select("playlists_id", "songs_id")
      .from("playlists_songs")
      .where("playlists_id", playlistId);
    //select * from
  };

  getProfilePlaylistSong = async (songsId: number) => {
    return await this.knex
      .select("songs_id", "songs_name", "image")
      .from("songs")
      .where("songs_id", songsId);
  };
}
