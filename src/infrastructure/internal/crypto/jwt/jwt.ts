import jwt from "jsonwebtoken";
import { config } from "./config/config";
import { AuthTokenType } from "../../../../domain/@types";

function encrypt(id: number): string {
  const token = jwt.sign({ id }, config.SECRET_KEY, {
    expiresIn: config.EXPIRES_IN,
  });

  return token;
}

function verifyToken(token: string): string | AuthTokenType {
  try {
    const checkedToken = jwt.verify(token.split(" ")[1], config.SECRET_KEY) as
      | string
      | AuthTokenType;
    return checkedToken;
  } catch (error) {
    return "invalid token";
  }
}

export { encrypt, verifyToken };
