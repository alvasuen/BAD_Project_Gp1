import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  //默認是這個環境，但可以透過.env修改
  NODE_ENV: "development",
  DB_NAME: "",
  DB_USER: "",
  DB_PASSWORD: "",
  PORT: "",
  MRAP: "",
  keyId: "",
  accessKey: "",
};

populateEnv(env, { mode: "halt" });
