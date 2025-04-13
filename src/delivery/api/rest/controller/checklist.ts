import * as useCase from "@/domain/usecase/checklist";
import { Request, Response } from "express";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";
import { Controller } from "./controller";
import { UpdateChecklistUseCaseResponse } from "../../../../domain/usecase/ucio/checklist";

class CreateChecklistController extends Controller {
  async execute(req: Request, res: Response) {
    const { tokenUserId, userId, systemId, items } = req.body;

    const ucReq = {
      tokenUserId,
      userId,
      systemId,
      items,
    };

    const checklistRepository = this.factory.makeChecklistRepository();
    const systemRepository = this.factory.makeSystemRepository();
    const userRepository = this.factory.makeUserRepository();
    const itemRepository = this.factory.makeItemRepository();
    const ucRes = await new useCase.CreateChecklistUseCase(
      checklistRepository,
      systemRepository,
      userRepository,
      itemRepository,
    ).execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { checklist: ucRes.checklist });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class GetChecklistController extends Controller {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = {
      id: +id,
      tokenUserId,
    };

    const checklistRepository = this.factory.makeChecklistRepository();
    const usecase = new useCase.GetChecklistUseCase(checklistRepository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { checklist: ucRes.checklist });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class DeleteChecklistController extends Controller {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = {
      id: +id,
      tokenUserId,
    };

    const checklistRepository = this.factory.makeChecklistRepository();
    const usecase = new useCase.DeleteChecklistUseCase(checklistRepository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class UpdateChecklistController extends Controller {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId, systemId, items } = req.body;

    const checklistRepository = this.factory.makeChecklistRepository();
    const systemRepository = this.factory.makeSystemRepository();
    const usecase = new useCase.UpdateChecklistUseCase(
      checklistRepository,
      systemRepository,
    );

    let ucRes: UpdateChecklistUseCaseResponse;
    await checklistRepository.runInTransaction(async () => {
      ucRes = await usecase.execute({
        id: +id,
        tokenUserId,
        systemId,
        items,
      });
    });

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class ListChecklistsByUserIdController extends Controller {
  async execute(req: Request, res: Response) {
    const { userId } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = {
      tokenUserId,
      userId: +userId,
    };

    const checklistRepository = this.factory.makeChecklistRepository();
    const userRepository = this.factory.makeUserRepository();
    const usecase = new useCase.ListChecklistsByUserIdUseCase(
      checklistRepository,
      userRepository,
    );

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { checklists: ucRes.checklists });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class ListChecklistsBySystemIdController extends Controller {
  async execute(req: Request, res: Response) {
    const { systemId } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = {
      tokenUserId,
      systemId: +systemId,
    };

    const checklistRepository = this.factory.makeChecklistRepository();
    const systemRepository = this.factory.makeSystemRepository();
    const usecase = new useCase.ListChecklistsBySystemIdUseCase(
      checklistRepository,
      systemRepository,
    );

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { checklists: ucRes.checklists });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

export {
  CreateChecklistController,
  GetChecklistController,
  DeleteChecklistController,
  UpdateChecklistController,
  ListChecklistsByUserIdController,
  ListChecklistsBySystemIdController,
};
