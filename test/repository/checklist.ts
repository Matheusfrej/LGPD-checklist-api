import { ChecklistEntity } from "../../src/domain/entity/checklist";
import { ChecklistRepositoryInterface } from "../../src/domain/usecase/repository/checklist";
import { ChecklistItemEntity } from "../../src/domain/entity/checklistItem";
import { ItemEntity } from "../../src/domain/entity/item";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  UpdateChecklistUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
} from "../../src/domain/usecase/ucio/checklist";
import { LawEntity } from "../../src/domain/entity/law";
import { DeviceEntity } from "../../src/domain/entity/device";

class ChecklistInMemoryRepository implements ChecklistRepositoryInterface {
  public items: ChecklistEntity[] = [];
  private counter = 0;

  async createChecklist(
    checklist: CreateChecklistUseCaseRequest,
  ): Promise<ChecklistEntity> {
    const newChecklist = new ChecklistEntity(
      this.counter + 1,
      checklist.userId,
      checklist.systemId,
      checklist.items.map(
        (item) =>
          new ChecklistItemEntity(
            null,
            new ItemEntity(item.id, null, null, null, null, null, null),
            item.answer,
            item.severityDegree,
            item.userComment,
          ),
      ),
      checklist.laws.map((id) => new LawEntity(id, null)),
      checklist.devices.map((id) => new DeviceEntity(id, null)),
      new Date(),
      new Date(),
    );
    this.counter += 1;

    this.items.push(newChecklist);

    return newChecklist;
  }

  async getChecklist(id: number): Promise<ChecklistEntity> {
    const checklist: ChecklistEntity = this.items.find(
      (item) => item.id === id,
    );

    if (!checklist) {
      return null;
    }

    return checklist;
  }

  async deleteChecklist(req: DeleteChecklistUseCaseRequest): Promise<void> {
    this.items = this.items.filter((item) => item.id !== req.id);
  }

  async updateChecklist(req: UpdateChecklistUseCaseRequest): Promise<void> {
    const index = this.items.findIndex((item) => item.id === req.id);

    if (index === -1) {
      return null;
    }

    this.items[index].systemId = req.systemId;
    this.items[index].updatedAt = new Date();
  }

  async listChecklistsByUserId(
    req: ListChecklistsByUserIdUseCaseRequest,
  ): Promise<ChecklistEntity[]> {
    return this.items.filter((item) => item.userId === req.userId);
  }

  async listChecklistsBySystemId(
    req: ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<ChecklistEntity[]> {
    return this.items.filter((item) => item.systemId === req.systemId);
  }

  async getItemsFromChecklist(id: number): Promise<ChecklistItemEntity[]> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    return this.items[index].checklistItems;
  }

  async insertItemsFromChecklist(
    id: number,
    items: ChecklistItemEntity[],
  ): Promise<void> {
    const checklist = await this.getChecklist(id);
    if (!checklist) return;

    checklist.checklistItems = [...(checklist.checklistItems || []), ...items];
    checklist.updatedAt = new Date();
  }

  async removeItemsFromChecklist(
    id: number,
    itemsIds: number[],
  ): Promise<void> {
    const checklist = await this.getChecklist(id);
    if (!checklist) return;

    checklist.checklistItems = checklist.checklistItems.filter(
      (item) => !itemsIds.includes(item.item.id),
    );
    checklist.updatedAt = new Date();
  }

  async updateItemFromChecklist(
    id: number,
    item: ChecklistItemEntity,
  ): Promise<void> {
    const checklist = await this.getChecklist(id);
    if (!checklist) return;

    const index = checklist.checklistItems.findIndex(
      (ci) => ci.item.id === item.item.id,
    );
    if (index === -1) return;

    checklist.checklistItems[index] = item;
    checklist.updatedAt = new Date();
  }

  async runInTransaction<T>(fn: (repo: this) => Promise<T>): Promise<T> {
    return fn(this);
  }
}

export { ChecklistInMemoryRepository };
