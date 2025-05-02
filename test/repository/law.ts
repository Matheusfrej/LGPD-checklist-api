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
    console.log(ids);
    console.log(ids.filter((id) => !this.items.find((item) => item.id === id)));

    return ids.filter((id) => !this.items.find((item) => item.id === id));
  }
}
