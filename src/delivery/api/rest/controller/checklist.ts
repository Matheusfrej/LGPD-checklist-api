import * as checklistUseCase from "@/domain/usecase/checklist";
import * as checklistUcio from "@/domain/usecase/ucio/checklist";
import * as checklistValidate from "@/infrastructure/provider/validate/checklist";
import * as checklistRepository from "@/infrastructure/provider/repository/checklist";
import { Request, Response } from "express";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";

class CreateChecklistController {
  async createChecklist(req: Request, res: Response) {
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

    const validate = new checklistValidate.CreateChecklistUseCaseValidate();
    const repository =
      new checklistRepository.CreateChecklistUseCaseRepository();
    const usecase = new checklistUseCase.CreateChecklistUseCase(
      validate,
      repository,
    );

    const ucRes = await usecase.createChecklist(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { checklist: ucRes.checklist });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class GetChecklistController {
  async getChecklist(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new checklistUcio.GetChecklistUseCaseRequest(
      tokenUserId,
      +id,
    );

    const validate = new checklistValidate.GetChecklistUseCaseValidate();
    const repository = new checklistRepository.GetChecklistUseCaseRepository();
    const usecase = new checklistUseCase.GetChecklistUseCase(
      validate,
      repository,
    );

    const ucRes = await usecase.getChecklist(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { checklist: ucRes.checklist });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class DeleteChecklistController {
  async deleteChecklist(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new checklistUcio.DeleteChecklistUseCaseRequest(
      tokenUserId,
      +id,
    );

    const validate = new checklistValidate.DeleteChecklistUseCaseValidate();
    const repository =
      new checklistRepository.DeleteChecklistUseCaseRepository();
    const usecase = new checklistUseCase.DeleteChecklistUseCase(
      validate,
      repository,
    );

    const ucRes = await usecase.deleteChecklist(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class UpdateChecklistController {
  async updateChecklist(req: Request, res: Response) {
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

    const validate = new checklistValidate.UpdateChecklistUseCaseValidate();
    const repository =
      new checklistRepository.UpdateChecklistUseCaseRepository();
    const usecase = new checklistUseCase.UpdateChecklistUseCase(
      validate,
      repository,
    );

    const ucRes = await usecase.updateChecklist(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class ListChecklistsByUserIdController {
  async listChecklistsByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new checklistUcio.ListChecklistsByUserIdUseCaseRequest(
      tokenUserId,
      +userId,
    );

    const validate =
      new checklistValidate.ListChecklistsByUserIdUseCaseValidate();
    const repository =
      new checklistRepository.ListChecklistsByUserIdUseCaseRepository();
    const usecase = new checklistUseCase.ListChecklistsByUserIdUseCase(
      validate,
      repository,
    );

    const ucRes = await usecase.listChecklistsByUserId(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { checklists: ucRes.checklists });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class ListChecklistsBySystemIdController {
  async listChecklistsBySystemId(req: Request, res: Response) {
    const { systemId } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new checklistUcio.ListChecklistsBySystemIdUseCaseRequest(
      tokenUserId,
      +systemId,
    );

    const validate =
      new checklistValidate.ListChecklistsBySystemIdUseCaseValidate();
    const repository =
      new checklistRepository.ListChecklistsBySystemIdUseCaseRepository();
    const usecase = new checklistUseCase.ListChecklistsBySystemIdUseCase(
      validate,
      repository,
    );

    const ucRes = await usecase.listChecklistsBySystemId(ucReq);

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
