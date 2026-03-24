import { LawEntity } from "../../entity/law";
import { CreateLawUseCaseRequest } from "../ucio/law";

export interface LawRepositoryInterface {
  items?: LawEntity[];

  create(req: CreateLawUseCaseRequest): Promise<LawEntity>;
  existByIds(ids: number[]): Promise<number[]>;
  list(): Promise<LawEntity[]>;
}
