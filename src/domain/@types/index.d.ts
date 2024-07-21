import { JsonValue } from "@prisma/client/runtime/library";

type Json = JsonValue;

type AuthTokenType = {
  id: number;
  iat: number;
  exp: number;
};

export type { Json, AuthTokenType };
