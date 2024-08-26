import { AuthRepositoryInterface } from "../domain/usecase/repository/auth";

class AuthFakeRepository implements AuthRepositoryInterface {
  createToken(id: number): string {
    return id.toString();
  }

  verifyToken(token: string) {
    if (token === "invalid token") {
      return token;
    }

    return {
      id: +token,
      iat: 1,
      exp: 1,
    };
  }
}

export { AuthFakeRepository };
