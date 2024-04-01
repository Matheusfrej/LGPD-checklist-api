import { VerifyTokenController } from "../controller/user";

const verifyTokenMiddlewareBind = new VerifyTokenController(true);

const verifyTokenMiddleware = verifyTokenMiddlewareBind.verifyToken.bind(
  verifyTokenMiddlewareBind,
);

export { verifyTokenMiddleware };
