import { comparePassword, hashPassword } from "../../hash";
import { HTTPError } from "../../http-error";
import { knex } from "../../db";
class UserService {
  constructor() {}

  async signup(input: {
    username: string;
    password: string;
    email: string;
  }): Promise<{ users_id: number }> {
    let [users_id] = await knex
      .insert({
        email: input.email,
        username: input.username,
        password: await hashPassword(input.password),
      })
      .into("users")
      .returning("users_id");

    return users_id;
  }

  async login(input: { username: string; password: string }): Promise<number> {
    let [result] = await knex("users")
      .select("users_id", "password")
      .where("username", input.username);
    console.log(input.username);

    if (!result) {
      throw new Error("Not exist this user");
    }
    let checked = await comparePassword({
      password: input.password,
      password_hash: result.password,
    });
    if (!checked) {
      console.log("wrong password");

      throw new Error("wrong username or password");
    }

    return result.users_id;
  }

  async getUser(userId: number): Promise<{ username: string; email: string }> {
    let [result] = await knex("users")
      .select("username", "email", "users_id")
      .where("users_id", userId);

    return result;
  }
}
export let userService = new UserService();
