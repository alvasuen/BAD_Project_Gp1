import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("history"))) {
    await knex.schema.createTable("history", (table) => {
      table.increments("history_id");
      table.integer("songs_id").unsigned().notNullable();
      table.foreign("songs_id").references("songs.songs_id");
      table.integer("users_id").unsigned().notNullable();
      table.foreign("users_id").references("users.users_id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("history");
}
