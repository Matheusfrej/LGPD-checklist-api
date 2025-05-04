import { LawEntity } from "../../entity/law";
import { BaseResponse } from "./common";

export type CreateLawUseCaseRequest = {
  id: number;
  name: string;
};

export type ListLawsUseCaseResponse = BaseResponse & {
  laws: LawEntity[];
};
