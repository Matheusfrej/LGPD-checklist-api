import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";
import { Request, Response, NextFunction } from "express";

export abstract class Controller {
  public factory: RepositoryFactory;

  constructor(factory: RepositoryFactory) {
    this.factory = factory;
  }

  abstract execute(
    req: Request,
    res: Response,
    next?: NextFunction,
  ): Promise<void>;
}
