import * as checklistUseCase from "@/domain/usecase/checklist";
import * as checklistUcio from "@/domain/usecase/ucio/checklist";
import { Request, Response } from "express";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";
import { Controller } from "./controller";

class CreateChecklistController extends Controller {
  async execute(req: Request, res: Response) {
    const { tokenUserId, userId, systemId, items } = req.body;

    const ucReq = new checklistUcio.CreateChecklistUseCaseRequest(
      tokenUserId,
      userId,
      systemId,
      items,
    );

    const checklistRepository = this.factory.makeChecklistRepository();
    const systemRepository = this.factory.makeSystemRepository();
    const userRepository = this.factory.makeUserRepository();
    const itemRepository = this.factory.makeItemRepository();
    const ucRes = await new checklistUseCase.CreateChecklistUseCase(
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

    const ucReq = new checklistUcio.GetChecklistUseCaseRequest(
      tokenUserId,
      +id,
    );

    const checklistRepository = this.factory.makeChecklistRepository();
    const usecase = new checklistUseCase.GetChecklistUseCase(
      checklistRepository,
    );

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

    const ucReq = new checklistUcio.DeleteChecklistUseCaseRequest(
      tokenUserId,
      +id,
    );

    const checklistRepository = this.factory.makeChecklistRepository();
    const usecase = new checklistUseCase.DeleteChecklistUseCase(
      checklistRepository,
    );

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
    const { tokenUserId, systemId, checklistData, isGeneral, isIot } = req.body;

    const ucReq = new checklistUcio.UpdateChecklistUseCaseRequest(
      +id,
      tokenUserId,
      systemId,
      checklistData,
      isGeneral,
      isIot,
    );

    const checklistRepository = this.factory.makeChecklistRepository();
    const systemRepository = this.factory.makeSystemRepository();
    const usecase = new checklistUseCase.UpdateChecklistUseCase(
      checklistRepository,
      systemRepository,
    );

    const ucRes = await usecase.execute(ucReq);

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

    const ucReq = new checklistUcio.ListChecklistsByUserIdUseCaseRequest(
      tokenUserId,
      +userId,
    );

    const checklistRepository = this.factory.makeChecklistRepository();
    const userRepository = this.factory.makeUserRepository();
    const usecase = new checklistUseCase.ListChecklistsByUserIdUseCase(
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

    const ucReq = new checklistUcio.ListChecklistsBySystemIdUseCaseRequest(
      tokenUserId,
      +systemId,
    );

    const checklistRepository = this.factory.makeChecklistRepository();
    const systemRepository = this.factory.makeSystemRepository();
    const usecase = new checklistUseCase.ListChecklistsBySystemIdUseCase(
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
