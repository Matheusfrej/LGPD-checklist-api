import { ErrorEntity } from "../../entity/error";

export type BaseResponse = {
  error: ErrorEntity;
};

export type UserAuthenticated = {
  tokenUserId: number;
};
