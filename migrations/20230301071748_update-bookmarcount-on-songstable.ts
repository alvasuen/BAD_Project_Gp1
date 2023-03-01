import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("songs", (table) => {
    table
      .integer("bookmark_count")
      .unsigned()
      .notNullable()
      .defaultTo(0)
      .alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("songs", (table) => {
    table.integer("bookmark_count").unsigned();
  });
}
