import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("artists", (table) => {
    table.renameColumn("artists_name", "artist_name");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("artists", (table) => {
    table.renameColumn("artist_name", "artists_name");
  });
}
