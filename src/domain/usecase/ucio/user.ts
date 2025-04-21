import { UserEntity } from "../../entity/user";
import { BaseResponse, UserAuthenticated } from "./common";

export type CreateUserUseCaseRequest = {
  name: string;
  office: string;
  email: string;
  password: string;
};

export type CreateUserUseCaseResponse = BaseResponse & {
  user: UserEntity;
};

export type LoginUseCaseRequest = {
  email: string;
  password: string;
};
export type LoginUseCaseResponse = BaseResponse & {
  user: UserEntity;
  token: string;
};

export type VerifyTokenUseCaseRequest = {
  token: string;
};
export type VerifyTokenUseCaseResponse = BaseResponse & {
  user: UserEntity;
  token: string;
};

export type UpdateUserUseCaseRequest = UserAuthenticated & {
  id: number;
  name: string;
  office: string;
};

export type UpdateUserUseCaseResponse = BaseResponse;

export type GetUserUseCaseRequest = {
  id: number;
};

export type GetUserUseCaseResponse = BaseResponse & {
  user: UserEntity;
};

export type DeleteUserUseCaseRequest = UserAuthenticated & {
  id: number;
};
export type DeleteUserUseCaseResponse = BaseResponse;
