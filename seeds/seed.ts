import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("playlists_songs").del();
  await knex("playlists").del();
  await knex("users").del();
  await knex("songs").del();
  await knex("artists").del();
  await knex("lyrics").del();

  // Inserts seed entries
  await knex("lyrics").insert([{ lyrics_id: 1, content: "Hello" }]);
  await knex("artists").insert([
    { artists_id: 1, artists_name: "Green Day", lyrics_id: 1 },
  ]);

  await knex("songs").insert([
    {
      songs_id: 1,
      songs_name: "xx",
      artists_id: 1,
      lyrics_id: 1,
      bookmark_count: 0,
    },
  ]);
  await knex("users").insert([
    {
      users_id: 1,
      email: "123@gmail.com",
      username: "jimsadsa",
      password: await hashPassword("123456"),
    },
  ]);

  await knex("playlists").insert([
    { playlists_id: 1, playlists_name: "playlist1", users_id: 1 },
  ]);
  await knex("playlists_songs").insert([
    { playlists_songs_id: 1, playlists_id: 1, songs_id: 1 },
  ]);
}
