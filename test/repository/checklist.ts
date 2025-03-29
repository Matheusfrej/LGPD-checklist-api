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

    // if (index === -1) {
    return null;
    // }

    this.items[index].systemId = req.systemId;
    this.items[index].checklistData = req.checklistData;
    this.items[index].isGeneral = req.isGeneral;
    this.items[index].isIot = req.isIot;
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
}

export { ChecklistInMemoryRepository };
