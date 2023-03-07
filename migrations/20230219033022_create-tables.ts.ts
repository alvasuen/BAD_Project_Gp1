import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (table) => {
      table.increments("users_id");
      table.string("email", 255).notNullable().unique();
      table.string("username", 60).notNullable().unique();
      table.string("password", 255).notNullable();
    });
  }

  if (!(await knex.schema.hasTable("lyrics"))) {
    await knex.schema.createTable("lyrics", (table) => {
      table.increments("lyrics_id");
      table.text("content").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("artists"))) {
    await knex.schema.createTable("artists", (table) => {
      table.increments("artists_id");
      table.string("artists_name", 255).notNullable();
      table.integer("lyrics_id").unsigned().notNullable();
      table.foreign("lyrics_id").references("lyrics.lyrics_id");
    });
  }

  if (!(await knex.schema.hasTable("songs"))) {
    await knex.schema.createTable("songs", (table) => {
      table.increments("songs_id");
      table.text("songs_name").notNullable();
      table.integer("bookmark_count").notNullable();
      table.integer("artists_id").unsigned().notNullable();
      table.foreign("artists_id").references("artists.artists_id");
      table.integer("lyrics_id").unsigned().notNullable();
      table.foreign("lyrics_id").references("lyrics.lyrics_id");
    });
  }

  if (!(await knex.schema.hasTable("categories"))) {
    await knex.schema.createTable("categories", (table) => {
      table.increments("categories_id");
      table.text("area").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("categories_songs"))) {
    await knex.schema.createTable("categories_songs", (table) => {
      table.increments("categories_songs_id");
      table.integer("songs_id").unsigned().notNullable();
      table.foreign("songs_id").references("songs.songs_id");
      table.integer("categories_id").unsigned().notNullable();
      table.foreign("categories_id").references("categories.categories_id");
    });
  }

  if (!(await knex.schema.hasTable("playlists"))) {
    await knex.schema.createTable("playlists", (table) => {
      table.increments("playlists_id");
      table.string("playlists_name", 255).notNullable();
      table.integer("users_id").unsigned().notNullable();
      table.foreign("users_id").references("users.users_id");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("playlists_songs"))) {
    await knex.schema.createTable("playlists_songs", (table) => {
      table.increments("playlists_songs_id");
      table.integer("playlists_id").unsigned().notNullable();
      table.foreign("playlists_id").references("playlists.playlists_id");
      table.integer("songs_id").unsigned().notNullable();
      table.foreign("songs_id").references("songs.songs_id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("playlists_songs");
  await knex.schema.dropTableIfExists("playlists");
  await knex.schema.dropTableIfExists("categories_songs");
  await knex.schema.dropTableIfExists("categories");
  await knex.schema.dropTableIfExists("songs");
  await knex.schema.dropTableIfExists("artists");
  await knex.schema.dropTableIfExists("lyrics");
  await knex.schema.dropTableIfExists("users");
}
