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

  async getSystem(id: number): Promise<SystemEntity> {
    const system: SystemEntity = this.items.find((item) => item.id === id);

    if (!system) {
      return null;
    }

    return system;
  }

  async deleteSystem(
    req: systemUcio.DeleteSystemUseCaseRequest,
  ): Promise<void> {
    this.items = this.items.filter((item) => item.id !== req.id);
  }

  async updateSystem(
    req: systemUcio.UpdateSystemUseCaseRequest,
  ): Promise<void> {
    const index = this.items.findIndex((item) => item.id === req.id);

    if (index === -1) {
      return null;
    }

    this.items[index].name = req.name;
    this.items[index].description = req.description;
  }
}

export { SystemInMemoryRepository };
