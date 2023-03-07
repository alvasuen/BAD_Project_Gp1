import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("download_status"))) {
        await knex.schema.createTable("download_status", (table) => {
            table.increments("status_id");
            table.text("ytId",).notNullable().unique();
            table.text("url").notNullable();
            table.integer("users_id");
            table.foreign("users_id").references("users.users_id");
})}}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("download_status");
}

