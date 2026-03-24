import { SystemEntity } from "../../entity/system";
import { BaseResponse, UserAuthenticated } from "./common";

export type CreateSystemUseCaseRequest = UserAuthenticated & {
  name: string;
  description: string;
  userId: number;
};

export type CreateSystemUseCaseResponse = BaseResponse & {
  system: SystemEntity;
};

export type ListSystemsByUserIdUseCaseRequest = UserAuthenticated & {
  userId: number;
};

export type ListSystemsByUserIdUseCaseResponse = BaseResponse & {
  systems: SystemEntity[];
};

export type GetSystemUseCaseRequest = {
  id: number;
};

export type GetSystemUseCaseResponse = BaseResponse & {
  system: SystemEntity;
};

export type DeleteSystemUseCaseRequest = UserAuthenticated & {
  id: number;
};

export type DeleteSystemUseCaseResponse = BaseResponse;

export type UpdateSystemUseCaseRequest = UserAuthenticated & {
  id: number;
  name: string;
  description: string;
};

export type UpdateSystemUseCaseResponse = BaseResponse;
