import express from "express";
import { Knex } from "knex";
import "../../session";
let app = express();

export class PlaylistsService {
  constructor(private knex: Knex) {}
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
            .where("playlists_id", id);
        })
        .orderBy("songs.songs_id", "asc");
      let playlist = await this.knex("playlists")
        .select("playlists_name","playlists_id")
        .where("playlists_id", id);
        console.log();
        

      console.log(songs);
      return { songs, playlist };
    } catch (err: any) {
      throw new Error(err.message);
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

  addSongToPlayList = async (playlists_id: number, songs_id:number)=>{
    console.log(playlists_id,songs_id,'service 55')
    await this.knex("playlists_songs")
    .insert({
      playlists_id: playlists_id,
      songs_id: songs_id
    })
  }

  createPlaylist = async(playlists_name: string, users_id:number)=>{
    await this.knex("playlists")
    .insert({
      playlists_name: playlists_name,
      users_id: users_id
    })
  }
}
