import { SystemEntity } from "../../entity/system";
import { ErrorEntity } from "../../entity/error";

export type CreateSystemUseCaseRequest = {
  name: string;
  description: string;
  userId: number;
  tokenUserId: number;
};

export type CreateSystemUseCaseResponse = {
  system: SystemEntity;
  error: ErrorEntity;
};

export type ListSystemsByUserIdUseCaseRequest = {
  tokenUserId: number;
  userId: number;
};

export type ListSystemsByUserIdUseCaseResponse = {
  systems: SystemEntity[];
  error: ErrorEntity;
};

export type GetSystemUseCaseRequest = {
  id: number;
};

export type GetSystemUseCaseResponse = {
  system: SystemEntity;
  error: ErrorEntity;
};

export type DeleteSystemUseCaseRequest = {
  id: number;
  tokenUserId: number;
};

export type DeleteSystemUseCaseResponse = {
  error: ErrorEntity;
};

export type UpdateSystemUseCaseRequest = {
  id: number;
  name: string;
  description: string;
  tokenUserId: number;
};

export type UpdateSystemUseCaseResponse = {
  error: ErrorEntity;
};
