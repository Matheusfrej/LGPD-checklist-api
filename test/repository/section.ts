import { SectionEntity } from "../../src/domain/entity/section";
import { SectionRepositoryInterface } from "../../src/domain/usecase/repository/section";
import { CreateSectionUseCaseRequest } from "../domain/usecase/ucio/section";

export class SectionInMemoryRepository implements SectionRepositoryInterface {
  public items: SectionEntity[] = [];
  private counter = 0;

  async create(req: CreateSectionUseCaseRequest): Promise<SectionEntity> {
    this.counter += 1;
    const section = new SectionEntity(this.counter, req.name);
    this.items.push(section);
    return section;
  }
}
