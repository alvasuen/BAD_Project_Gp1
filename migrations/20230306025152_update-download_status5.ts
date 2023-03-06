import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("download_status", (table) => {
    table.text("songs_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("download_status", (table) => {
    table.dropColumn("songs_id");
  });
}