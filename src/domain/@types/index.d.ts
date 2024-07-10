import { JsonValue } from "@prisma/client/runtime/library";

export type Json = JsonValue;

export type AuthTokenType = {
  id: number;
  iat: number;
  exp: number;
};
