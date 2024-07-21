import { Response } from "express";
import { ErrorEntity } from "../../../../domain/entity/error";

class SuccessResponse {
  success(res: Response, body: unknown) {
    return res.status(200).json(body);
  }
}

class InternalServerErrorResponse {
  internalServerError(res: Response, error: ErrorEntity) {
    return res.status(500).send({ error });
  }
}

export { SuccessResponse, InternalServerErrorResponse };
