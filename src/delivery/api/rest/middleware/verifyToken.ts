import { VerifyTokenController } from "../controller/user";

const verifyTokenMiddlewareBind = new VerifyTokenController(true);

const verifyTokenMiddleware = verifyTokenMiddlewareBind.execute.bind(
  verifyTokenMiddlewareBind,
);

export { verifyTokenMiddleware };
