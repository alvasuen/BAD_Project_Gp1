import Knex from "knex";
import { env } from "./env";

let profiles = require("./knexfile");
// console.log(profiles);
// let config = profiles.development;
let config = profiles[env.NODE_ENV];
// console.log(config);

export let knex = Knex(config);
