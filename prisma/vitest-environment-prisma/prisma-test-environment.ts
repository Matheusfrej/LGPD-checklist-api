import "dotenv/config";

import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { Environment } from "vitest/environments";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const env_variable = "DATABASE_URL";

function generateDatabaseURL(schema: string) {
  if (!process.env[env_variable]) {
    throw new Error(`Please provide a ${env_variable} environment variable`);
  }

  const url = new URL(process.env[env_variable]);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();

    process.env[env_variable] = generateDatabaseURL(schema);

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );
        await prisma.$disconnect();
      },
    };
  },
};
