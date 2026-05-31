import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const envFilesByScript = {
  dev: ".env.local",
  start: ".env.production",
};

const envFileName =
  process.env.ENV_FILE ||
  envFilesByScript[process.env.npm_lifecycle_event] ||
  (process.env.NODE_ENV === "production" ? ".env.production" : ".env.local");

const envFilePath = path.isAbsolute(envFileName)
  ? envFileName
  : fileURLToPath(new URL(`../../${envFileName}`, import.meta.url));

dotenv.config({ path: envFilePath });

process.env.NODE_ENV ||=
  envFileName === ".env.production" ? "production" : "development";
