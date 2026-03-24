import { SectionEntity } from "../../entity/section";
import { CreateSectionUseCaseRequest } from "../ucio/section";

export interface SectionRepositoryInterface {
  create(req: CreateSectionUseCaseRequest): Promise<SectionEntity>;
}
