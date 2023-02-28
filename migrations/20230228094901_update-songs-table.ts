import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("songs", (table) => {
    table.integer("artists_id").unsigned().notNullable().defaultTo(1).alter();
    table.text("yt_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("songs", (table) => {
    table.integer("artists_id").unsigned().notNullable();
    table.dropColumn("yt_id");
  });
}
