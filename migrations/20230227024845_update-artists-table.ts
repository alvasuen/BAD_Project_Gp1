import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("artists", (table) => {
    table.dropColumn("lyrics_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("artists", (table) => {
    table.integer("lyrics_id").unsigned().notNullable();
    table.foreign("lyrics_id").references("lyrics.lyrics_id");
  });
}
