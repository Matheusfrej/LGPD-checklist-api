/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { config } from "./config/config";

function encrypt(id: number): string {
  const token = jwt.sign({ id }, config.SECRET_KEY, {
    expiresIn: config.EXPIRES_IN,
  });

  return token;
}

function verifyToken(token: string): any {
  const checkedToken = jwt.verify(token, config.SECRET_KEY);

  return checkedToken;
}

export { encrypt, verifyToken };
