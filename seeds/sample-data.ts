import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  async function seedRow(table: string, data: object, filter = data) {
    let row = await knex.select("id").from(table).where(filter).first();

    //If the data are already exit --> update data
    if (row) {
      await knex(table).update(data).where(filter);
      return row.id;
    }

    //If the data doesn't exit --> insert data
    let rows = await knex.insert(data).into(table).returning("id");
    return rows[0].id;
  }

  let user1 = await seedRow("users", {
    email: "user1@email.com",
    username: "Peter",
    //123
    password: "$2y$10$CcczWmx85TbvjcZDMkUER.ZrJIpgTMGjFoukr5CZ1HY2Qkoq195qa",
  });

  let user2 = await seedRow("users", {
    email: "user2@email.com",
    username: "Ben",
    //321
    password: "$2y$10$Qj6ODZn9GVwY/CmAhqDo2.65dimMOUvQ507nSN/MsNuZ79ZNY9ui6",
  });

  //   // Inserts seed entries
  //   await knex("table_name").insert([
  //     { id: 1, colName: "rowValue1" },
  //     { id: 2, colName: "rowValue2" },
  //     { id: 3, colName: "rowValue3" },
  //   ]);
}
