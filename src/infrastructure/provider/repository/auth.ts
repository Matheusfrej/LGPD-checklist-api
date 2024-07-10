import { encrypt, verifyToken } from "../../internal/crypto/jwt/jwt";
import { AuthRepositoryInterface } from "../../../domain/usecase/repository/auth";
import { AuthTokenType } from "../../../domain/@types";

class AuthJWTRepository implements AuthRepositoryInterface {
  createToken(id: number): string {
    return encrypt(id);
  }

  verifyToken(token: string): string | AuthTokenType {
    return verifyToken(token);
  }
}

export { AuthJWTRepository };
