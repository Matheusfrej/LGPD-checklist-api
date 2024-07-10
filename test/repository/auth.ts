import { AuthRepositoryInterface } from "../domain/usecase/repository/auth";

class AuthFakeRepository implements AuthRepositoryInterface {
  createToken(id: number): string {
    return `${id}`;
  }

  verifyToken(token: string) {
    return {
      id: +token,
      iat: 1,
      exp: 1,
    };
  }
}

export { AuthFakeRepository };
