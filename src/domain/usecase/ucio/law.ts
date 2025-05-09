import { LawEntity } from "../../entity/law";
import { BaseResponse } from "./common";

export type CreateLawUseCaseRequest = {
  name: string;
};

export type ListLawsUseCaseResponse = BaseResponse & {
  laws: LawEntity[];
};
