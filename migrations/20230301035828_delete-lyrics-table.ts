import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("songs", (table) => {
    table.dropColumn("lyrics_id");
  });
  await knex.schema.dropTableIfExists("lyrics");
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable("lyrics", (table) => {
    table.increments("lyrics_id");
    table.text("content").notNullable();
  });

  await knex.schema.alterTable("songs", (table) => {
    table.integer("lyrics_id").unsigned().notNullable();
    table.foreign("lyrics_id").references("lyrics.lyrics_id");
  });
}
