/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

class SuccessResponse {
  success(res: Response, body: any) {
    return res.status(200).json(body);
  }
}

class InternalServerErrorResponse {
  internalServerError(res: Response, error: any) {
    return res.status(500).send(error);
  }
}

export { SuccessResponse, InternalServerErrorResponse };
