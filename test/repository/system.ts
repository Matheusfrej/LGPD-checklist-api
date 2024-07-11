import * as systemUcio from "@/domain/usecase/ucio/system";
import { SystemRepositoryInterface } from "../../src/domain/usecase/repository/system";
import { SystemEntity } from "../../src/domain/entity/system";

class SystemInMemoryRepository implements SystemRepositoryInterface {
  public items: SystemEntity[] = [];
  private counter = 0;

  async createSystem(
    system: systemUcio.CreateSystemUseCaseRequest,
  ): Promise<SystemEntity> {
    const newSystem = new SystemEntity(
      this.counter + 1,
      system.name,
      system.description,
      system.userId,
    );
    this.counter += 1;

    this.items.push(newSystem);

    return newSystem;
  }

  async listSystemsByUserId(
    req: systemUcio.ListSystemsByUserIdUseCaseRequest,
  ): Promise<SystemEntity[]> {
    const systemsFilteredByUserId = this.items.filter(
      (item) => item.userId === req.userId,
    );

    return systemsFilteredByUserId.map((system) => {
      return new SystemEntity(
        system.id,
        system.name,
        system.description,
        system.userId,
      );
    });
  }

  getSystem(id: number): Promise<SystemEntity> {
    throw new Error("Method not implemented.");
  }

  deleteSystem(req: systemUcio.DeleteSystemUseCaseRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateSystem(req: systemUcio.UpdateSystemUseCaseRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { SystemInMemoryRepository };
