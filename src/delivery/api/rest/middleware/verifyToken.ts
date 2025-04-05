import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";
import { VerifyTokenController } from "../controller/user";

const verifyTokenMiddlewareBind = (factory: RepositoryFactory) =>
  new VerifyTokenController(true, factory);

const verifyTokenMiddleware = (factory: RepositoryFactory) =>
  verifyTokenMiddlewareBind(factory).execute.bind(verifyTokenMiddlewareBind);

export { verifyTokenMiddleware };
