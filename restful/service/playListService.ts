import express from "express";
import { Knex } from "knex";
import "../../session";
let app = express();

export class PlaylistsService {
  constructor(private knex: Knex) { }
  loadPlaylist = async (id: number, userId: number) => {
    try {
      // let rows = await this.knex("playlists_songs").select("songs_id")
      // let songIdArr = rows.map(obj => obj.songs_id)
      // let songs = await this.knex("songs").select("*").whereIn("songs_id")
      // console.log(rows)



      let songs = await this.knex("songs")
        // .join("playlists", "playlists.users_id", "=", `${userId}`)
        .select("*")
        .whereIn("songs.songs_id", function () {
          this.select("songs_id")
            .from("playlists_songs")
            .where("playlists_id", id)
        })
      let playlistName = await this.knex("playlists")
        .select("playlists_name")
        .where("playlists_id", id)

      console.log(songs)
      return { songs, playlistName };
    } catch (err: any) {
      throw new Error(err.message)
    }


    //   return await this.knex("playlists")
    //     .select("playlists_name", "playlists.playlists_id", "created_at")
    //     .where("playlists.playlists_id", id)
    //     .andWhere("users_id", userId)
    //     .innerJoin(
    //       "playlists_songs",
    //       "playlists.playlists_id",
    //       "playlists_songs.playlists_id"
    //     )
    //     .innerJoin("songs", "songs.songs_id", "playlists_songs.songs_id");
    // };
  };
  getPlayListByUserId = async (userId: number) => {
    return await this.knex("playlists")
      .select("playlists_name", "playlists.playlists_id", "created_at")
      .where("users_id", userId);
  };
}
