import { AuthTokenType } from "../../@types";

interface AuthRepositoryInterface {
  createToken(id: number): string;
  verifyToken(token: string): string | AuthTokenType;
}

export { AuthRepositoryInterface };
