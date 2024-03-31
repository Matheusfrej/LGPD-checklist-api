import { VerifyTokenController } from "../controller/user";

const verifyTokenMiddleware = ((instance) =>
  instance.verifyToken.bind(instance))(new VerifyTokenController(true));

export { verifyTokenMiddleware };
