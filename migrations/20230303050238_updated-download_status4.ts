import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("download_status", (table) => {
        table.text("ytId",);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("download_status", (table) => {
        table.dropColumn("ytId");
      });
}

