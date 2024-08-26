import * as checklistUseCase from "@/domain/usecase/checklist";
import * as checklistUcio from "@/domain/usecase/ucio/checklist";
import { Request, Response } from "express";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";
import { ChecklistPrismaRepository } from "@/infrastructure/provider/repository/checklist";
import { SystemPrismaRepository } from "@/infrastructure/provider/repository/system";
import { UserPrismaRepository } from "@/infrastructure/provider/repository/user";

class CreateChecklistController {
  async execute(req: Request, res: Response) {
    const { tokenUserId, userId, systemId, checklistData, isGeneral, isIot } =
      req.body;

    const ucReq = new checklistUcio.CreateChecklistUseCaseRequest(
      tokenUserId,
      userId,
      systemId,
      checklistData,
      isGeneral,
      isIot,
    );

    const checklistRepository = new ChecklistPrismaRepository();
    const systemRepository = new SystemPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const usecase = new checklistUseCase.CreateChecklistUseCase(
      checklistRepository,
      systemRepository,
      userRepository,
    );

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { checklist: ucRes.checklist });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class GetChecklistController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new checklistUcio.GetChecklistUseCaseRequest(
      tokenUserId,
      +id,
    );

    const checklistRepository = new ChecklistPrismaRepository();
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

class DeleteChecklistController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new checklistUcio.DeleteChecklistUseCaseRequest(
      tokenUserId,
      +id,
    );

    const checklistRepository = new ChecklistPrismaRepository();
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

class UpdateChecklistController {
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

    const checklistRepository = new ChecklistPrismaRepository();
    const systemRepository = new SystemPrismaRepository();
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

class ListChecklistsByUserIdController {
  async execute(req: Request, res: Response) {
    const { userId } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new checklistUcio.ListChecklistsByUserIdUseCaseRequest(
      tokenUserId,
      +userId,
    );

    const checklistRepository = new ChecklistPrismaRepository();
    const userRepository = new UserPrismaRepository();
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

class ListChecklistsBySystemIdController {
  async execute(req: Request, res: Response) {
    const { systemId } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new checklistUcio.ListChecklistsBySystemIdUseCaseRequest(
      tokenUserId,
      +systemId,
    );

    const checklistRepository = new ChecklistPrismaRepository();
    const systemRepository = new SystemPrismaRepository();
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
