import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("download_status").del();
  await knex("playlists_songs").del();
  await knex("playlists").del();
  await knex("categories_songs").del();
  await knex("categories").del();
  await knex("songs").del();
  await knex("artists").del();
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      email: "123@gmail.com",
      username: "jimsadsa",
      password: await hashPassword("123456"),
    },
    {
      email: "321@gmail.com",
      username: "userrobot",
      password: await hashPassword("123456"),
    },
  ]);

   await knex("categories").insert([{ area: "TaiWan" }, { area: "UK" }]);

  await knex("artists").insert([
    { artist_name: "Singer" },
    { artist_name: "Joji" },
    { artist_name: "Taylor Swift" },
    { artist_name: "The Weekend" },
    { artist_name: "MAYDAY" },
    { artist_name: "BLACKPINK" },
    { artist_name: "Lana Del Rey" },
    { artist_name: "Stephen Sanchez" },
    { artist_name: "Luke Chiang" },
    { artist_name: "Hozier" },
    { artist_name: "dhruv" },
    { artist_name: "Passenger" },
    { artist_name: "Adele" },
    { artist_name: "Novo Amor" },
    { artist_name: "Bon Jovi" },
    { artist_name: "Coldplay" },
  ]);

  await knex("songs").insert([
    {
      songs_name:
        "The Chainsmokers & Coldplay - Something Just Like This (Live at the BRITs)",
      artists_id: 16,
      image: "https://i.ytimg.com/vi/4u6bWs-ZG0o/sddefault.jpg",
      yt_id: "4u6bWs-ZG0o",
    },
    {
      songs_name: "Joji - Glimpse of Us (Official Video)",
      artists_id: 2,
      image: "https://i.ytimg.com/vi/NgsWGfUlwJI/sddefault.jpg",
      yt_id: "NgsWGfUlwJI",
    },
    {
      songs_name: "Taylor Swift - Love Story",
      artists_id: 3,
      image: "https://i.ytimg.com/vi/8xg3vE8Ie_E/sddefault.jpg",
      yt_id: "8xg3vE8Ie_E",
    },
    {
      songs_name: "The Weeknd - Save Your Tears (Official Music Video)",
      artists_id: 4,
      image: "https://i.ytimg.com/vi/XXYlFuWEuKI/sddefault.jpg",
      yt_id: "XXYlFuWEuKI",
    },
    {
      songs_name: "MAYDAY五月天 [ 玫瑰少年 ] Official Music Video",
      artists_id: 5,
      image: "https://i.ytimg.com/vi/65IKNssGRPI/sddefault.jpg",
      yt_id: "65IKNssGRPI",
    },
    {
      songs_name: "BLACKPINK - 'Hard to Love' (Official Audio)",
      artists_id: 6,
      image: "https://i.ytimg.com/vi/7Hr3p1BHC_E/sddefault.jpg",
      yt_id: "7Hr3p1BHC_E",
    },
    {
      songs_name: "Lana Del Rey - Video Games",
      artists_id: 7,
      image: "https://i.ytimg.com/vi/cE6wxDqdOV0/sddefault.jpg",
      yt_id: "cE6wxDqdOV0",
    },
    {
      songs_name: "Stephen Sanchez - Until I Found You (Official Music Video)",
      artists_id: 8,
      image: "https://i.ytimg.com/vi/GxldQ9eX2wo/sddefault.jpg",
      yt_id: "GxldQ9eX2wo",
    },
    {
      songs_name: "Shouldn't Be",
      artists_id: 9,
      image: "https://i.ytimg.com/vi/hsLiJP2rqS8/sddefault.jpg",
      yt_id: "hsLiJP2rqS8",
    },
    {
      songs_name: "Hozier - Take Me To Church",
      artists_id: 10,
      image: "https://i.ytimg.com/vi/PVjiKRfKpPI/sddefault.jpg",
      yt_id: "PVjiKRfKpPI",
    },
    {
      songs_name: "Lana Del Rey - Young and Beautiful",
      artists_id: 7,
      image: "https://i.ytimg.com/vi/o_1aF54DO60/sddefault.jpg",
      yt_id: "o_1aF54DO60",
    },
    {
      songs_name: "dhruv - double take (Official Video)",
      artists_id: 11,
      image: "https://i.ytimg.com/vi/R8FHtIhWqNo/sddefault.jpg",
      yt_id: "R8FHtIhWqNo",
    },
    {
      songs_name: "Passenger | Let Her Go (Official Video)",
      artists_id: 12,
      image: "https://i.ytimg.com/vi/RBumgq5yVrA/sddefault.jpg",
      yt_id: "RBumgq5yVrA",
    },
    {
      songs_name: "Adele - Easy On Me (Official Video)",
      artists_id: 13,
      image: "https://i.ytimg.com/vi/U3ASj1L6_sY/sddefault.jpg",
      yt_id: "U3ASj1L6_sY",
    },
    {
      songs_name: "Novo Amor - Holland (official video)",
      artists_id: 14,
      image: "https://i.ytimg.com/vi/usPrYhk9VG8/sddefault.jpg",
      yt_id: "usPrYhk9VG8",
    },
    {
      songs_name: "Bon Jovi - It's My Life (Official Music Video)",
      artists_id: 15,
      image: "https://i.ytimg.com/vi/vx2u5uUu3DE/sddefault.jpg",
      yt_id: "vx2u5uUu3DE",
    },
  ]);

  await knex("categories_songs").insert([
    { songs_id: 1, categories_id: 2 },
    { songs_id: 2, categories_id: 2 },
    { songs_id: 3, categories_id: 2 },
    { songs_id: 4, categories_id: 2 },
    { songs_id: 5, categories_id: 1 },
    { songs_id: 6, categories_id: 2 },
    { songs_id: 7, categories_id: 2 },
    { songs_id: 8, categories_id: 2 },
    { songs_id: 9, categories_id: 2 },
    { songs_id: 10, categories_id: 2 },
    { songs_id: 11, categories_id: 2 },
    { songs_id: 12, categories_id: 2 },
    { songs_id: 13, categories_id: 2 },
    { songs_id: 14, categories_id: 2 },
    { songs_id: 15, categories_id: 2 },
    { songs_id: 16, categories_id: 2 },
  ]);

  await knex("playlists").insert([
    { playlists_name: "playlist1", users_id: 1 },
    { playlists_name: "Number2 Playlist", users_id: 1 },
    { playlists_name: "My Favo", users_id: 2 },
  ]);

  await knex("playlists_songs").insert([
    { playlists_id: 1, songs_id: 1 },
    { playlists_id: 1, songs_id: 2 },
    { playlists_id: 1, songs_id: 3 },
    { playlists_id: 1, songs_id: 4 },
    { playlists_id: 1, songs_id: 5 },
    { playlists_id: 1, songs_id: 6 },
    { playlists_id: 1, songs_id: 7 },
    { playlists_id: 1, songs_id: 8 },
    { playlists_id: 1, songs_id: 9 },
    { playlists_id: 1, songs_id: 10 },
    { playlists_id: 2, songs_id: 1 },
    { playlists_id: 2, songs_id: 5 },
    { playlists_id: 2, songs_id: 7 },
    { playlists_id: 2, songs_id: 12 },
    { playlists_id: 2, songs_id: 13 },
    { playlists_id: 2, songs_id: 14 },
    { playlists_id: 2, songs_id: 15 },
    { playlists_id: 3, songs_id: 3 },
    { playlists_id: 3, songs_id: 2 },
  ]);
}
