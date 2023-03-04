import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("download_status", (table) => {
    table.text("message");
    table.timestamps(false, true);
    table.dropColumn("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("download_status", (table) => {
    table.dropColumn("message");
    table.dropColumn("created_at");
  });
}
