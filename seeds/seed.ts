import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
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

  await knex("artists").insert([
    { artist_name: "Singer" },
    { artist_name: "Coldplay" },
    { artist_name: "五月天" },
    { artist_name: "Singer" },
    { artist_name: "Coldplay" },
    { artist_name: "五月天" },
  ]);

  await knex("songs").insert([
    {
      songs_name: "Default Song",
      artists_id: 1,
      bookmark_count: 0,
    },
    {
      songs_name: "Something just like that",
      artists_id: 2,
      bookmark_count: 5,
    },
    {
      songs_name: "Fix you",
      artists_id: 2,
      bookmark_count: 2,
    },
    {
      songs_name: "知足",
      artists_id: 3,
      bookmark_count: 6,
    },
    {
      songs_name: "純真",
      artists_id: 3,
      bookmark_count: 2,
    },
  ]);

  await knex("categories").insert([
    { area: "TaiWan" },
    { area: "UK" },
  ]);
  await knex("categories").insert([{ area: "TaiWan" }, { area: "UK" }]);
  await knex("categories_songs").insert([
    { songs_id: 1, categories_id: 1 },
    { songs_id: 2, categories_id: 2 },
    { songs_id: 3, categories_id: 2 },
    { songs_id: 4, categories_id: 2 },
    { songs_id: 5, categories_id: 2 },
    { songs_id: 1, categories_id: 1 },
    { songs_id: 2, categories_id: 2 },
    { songs_id: 3, categories_id: 2 },
    { songs_id: 4, categories_id: 2 },
    { songs_id: 5, categories_id: 2 },
  ]);

  await knex("playlists").insert([
    { playlists_name: "playlist1", users_id: 1 },
    { playlists_name: "Number2 Playlist", users_id: 1 },
    { playlists_name: "My Favo", users_id: 2 },
    { playlists_name: "playlist1", users_id: 1 },
    { playlists_name: "Number2 Playlist", users_id: 1 },
    { playlists_name: "My Favo", users_id: 2 },
  ]);

  await knex("playlists_songs").insert([
    { playlists_id: 1, songs_id: 1 },
    { playlists_id: 1, songs_id: 2 },
    { playlists_id: 1, songs_id: 4 },
    { playlists_id: 1, songs_id: 5 },
    { playlists_id: 1, songs_id: 3 },
    { playlists_id: 2, songs_id: 1 },
    { playlists_id: 2, songs_id: 5 },
    { playlists_id: 3, songs_id: 3 },
    { playlists_id: 3, songs_id: 2 },
    { playlists_id: 1, songs_id: 1 },
    { playlists_id: 1, songs_id: 2 },
    { playlists_id: 1, songs_id: 4 },
    { playlists_id: 1, songs_id: 5 },
    { playlists_id: 1, songs_id: 3 },
    { playlists_id: 2, songs_id: 1 },
    { playlists_id: 2, songs_id: 5 },
    { playlists_id: 3, songs_id: 3 },
    { playlists_id: 3, songs_id: 2 },
  ]);
}
