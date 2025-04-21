import { SystemEntity } from "../../entity/system";
import { BaseResponse } from "./common";

export type CreateSystemUseCaseRequest = {
  name: string;
  description: string;
  userId: number;
  tokenUserId: number;
};

export type CreateSystemUseCaseResponse = BaseResponse & {
  system: SystemEntity;
};

export type ListSystemsByUserIdUseCaseRequest = {
  tokenUserId: number;
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

export type DeleteSystemUseCaseRequest = {
  id: number;
  tokenUserId: number;
};

export type DeleteSystemUseCaseResponse = BaseResponse;

export type UpdateSystemUseCaseRequest = {
  id: number;
  name: string;
  description: string;
  tokenUserId: number;
};

export type UpdateSystemUseCaseResponse = BaseResponse;
