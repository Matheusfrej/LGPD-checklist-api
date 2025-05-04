import { LawEntity } from "../../src/domain/entity/law";
import { LawRepositoryInterface } from "../../src/domain/usecase/repository/law";
import { CreateLawUseCaseRequest } from "../../src/domain/usecase/ucio/law";

export class LawInMemoryRepository implements LawRepositoryInterface {
  public items: LawEntity[] = [];
  private counter = 0;

  async create(req: CreateLawUseCaseRequest): Promise<LawEntity> {
    this.counter += 1;

    const item = new LawEntity(this.counter, req.name);

    this.items.push(item);

    return item;
  }

  async existByIds(ids: number[]): Promise<number[]> {
    return ids.filter((id) => !this.items.find((item) => item.id === id));
  }

  async list(): Promise<LawEntity[]> {
    return this.items;
  }
}
