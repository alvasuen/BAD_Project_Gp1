import { Knex } from "knex";
import "../../session";

export class SearchService {
  constructor(private knex: Knex) {}

  //Get artists
  getAllSinger = async () => {
    return await this.knex.select("artists_id", "artist_name").from("artists");
  };

  //Get songs by artists id
  getSingerSongs = async (artistsId: number) => {
    return await this.knex
      .select("songs_name", "image", "songs_id")
      .where("artists_id", artistsId);
  };

  //Get categories_id, area
  getArea = async () => {
    return await this.knex("categories").select("categories_id", "area");
  };

  //Get songs by area/category
  getAreaSongs = async (categoriesId: number) => {
    return await this.knex("categories_songs")
      .select("*")
      .innerJoin(
        "categories",
        "categories_songs.categories_id",
        "categories.categories_id"
      )
      .innerJoin("songs", "categories_songs.songs_id", "songs.songs_id")
      .where("categories_songs.categories_id", categoriesId);
  };

  //Get all songs in songs table
  getLanSongs = async () => {
    return await this.knex("songs").select("songs_name", "image");
  };

  //Get songs name image from user input
  getSearchInputSong = async (keyword: string) => {
    return await this.knex.raw(
      `select (songs_id) from "songs" where "songs_name" ~* ?),[${keyword}]`
    );
    // return await this.knex.raw(
    //   `select (songs_name and image) from "songs" where "songs_name" ~* ?),[${keyword}]`
    // );
  };

  //Get artists id from user input
  getSearchInputArtist = async (keyword: string) => {
    return await this.knex.raw(
      `select artists_id from "artists" where "artist_name" ~* ?),[${keyword}]`
    );
  };

  //Get songs_id by artists id
  getArtSongs = async (artistsId: number) => {
    return await this.knex.select("songs_id").where("artists_id", artistsId);
  };

  //Get categories_id from user input
  getSearchInputArea = async (keyword: string) => {
    return await this.knex.raw(
      `select categories_id from "categories" where "area" ~* ?),[${keyword}]`
    );
  };

  //Get songs by area/category
  getPSongs = async (categoriesId: number) => {
    return await this.knex("categories_songs")
      .select("songs_id")
      .innerJoin(
        "categories",
        "categories_songs.categories_id",
        "categories.categories_id"
      )
      .innerJoin("songs", "categories_songs.songs_id", "songs.songs_id")
      .where("categories_songs.categories_id", categoriesId);
  };

  getSongsBySId = async (songsId: number) => {
    return await this.knex("songs")
      .select("songs_name", "image")
      .where("songs_id", songsId);
  };
}
