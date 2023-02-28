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
  await knex("lyrics").del();
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      users_id: 1,
      email: "123@gmail.com",
      username: "jimsadsa",
      password: await hashPassword("123456"),
    },
  ]);
  await knex("lyrics").insert([{ lyrics_id: 1, content: "Hello" },
  { lyrics_id: 2, content: "Bye" },
  { lyrics_id: 3, content: "Good" },]);

  await knex("artists").insert([{ artists_id: 1, artist_name: "Green Day" },
  { artists_id: 2, artist_name: "Red Day" },
  { artists_id: 3, artist_name: "Blue Day" }]);

  await knex("songs").insert([
    {
      songs_id: 1,
      songs_name: "Yellow",
      artists_id: 1,
      lyrics_id: 1,
      bookmark_count: 0,
    },
    {
      songs_id: 2,
      songs_name: "Red",
      artists_id: 2,
      lyrics_id: 2,
      bookmark_count: 0,
    },
    {
      songs_id: 3,
      songs_name: "Blue",
      artists_id: 3,
      lyrics_id: 3,
      bookmark_count: 0,
    },
  ]);

  await knex("categories").insert([{ categories_id: 1, area: "TaiWan" },
  { categories_id: 2, area: "England" },
  { categories_id: 3, area: "HongKong" },]);

  await knex("categories_songs").insert([
    { categories_songs_id: 1, songs_id: 1, categories_id: 1 },
    { categories_songs_id: 2, songs_id: 2, categories_id: 2 },
    { categories_songs_id: 3, songs_id: 3, categories_id: 3 },

  ]);

  await knex("playlists").insert([
    { playlists_id: 1, playlists_name: "playlist1", users_id: 1 },
    { playlists_id: 2, playlists_name: "Adele", users_id: 1 },
    { playlists_id: 3, playlists_name: "Tom", users_id: 1 },
  ]);
  await knex("playlists_songs").insert([
    { playlists_songs_id: 1, playlists_id: 1, songs_id: 1 },
    { playlists_songs_id: 2, playlists_id: 2, songs_id: 2 },
    { playlists_songs_id: 3, playlists_id: 3, songs_id: 3 },
  ]);
}
