import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().optional(),
});

const envSchemaProductionOnly = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
});

const _env = envSchema.safeParse(process.env);
const _envProd = envSchemaProductionOnly.safeParse(process.env);

const isProductionEnvMissing =
  _env.success &&
  _env.data.NODE_ENV === "production" &&
  _envProd.success === false;

if (_env.success === false || isProductionEnvMissing) {
  console.error("Invalid enviroment variables", _env.error.format());

  throw new Error("Invalid enviroment variables.");
}

export const env = _env.data;
