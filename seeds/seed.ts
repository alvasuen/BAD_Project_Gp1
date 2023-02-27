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
  await knex("lyrics").insert([{ lyrics_id: 1, content: "Hello" }]);

  await knex("artists").insert([{ artists_id: 1, artist_name: "Green Day" }]);

  await knex("songs").insert([
    {
      songs_id: 1,
      songs_name: "Yellow",
      artists_id: 1,
      lyrics_id: 1,
      bookmark_count: 0,
    },
  ]);

  await knex("categories").insert([{ categories_id: 1, area: "TaiWan" }]);
  await knex("categories_songs").insert([
    { categories_songs_id: 1, songs_id: 1, categories_id: 1 },
  ]);

  await knex("playlists").insert([
    { playlists_id: 1, playlists_name: "playlist1", users_id: 1 },
  ]);
  await knex("playlists_songs").insert([
    { playlists_songs_id: 1, playlists_id: 1, songs_id: 1 },
  ]);
}
