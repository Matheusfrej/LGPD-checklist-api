import { LawRepositoryInterface } from "./repository/law";
import * as ucio from "../usecase/ucio/law";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  newInternalServerError,
  TAG_INTERNAL_SERVER_ERROR,
} from "../entity/error";

export class ListLawsUseCase {
  private lawRepository: LawRepositoryInterface;

  constructor(lawRepository: LawRepositoryInterface) {
    this.lawRepository = lawRepository;
  }

  async execute(): Promise<ucio.ListLawsUseCaseResponse> {
    try {
      const laws = await this.lawRepository.list();
      return {
        laws,
        error: null,
      };
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return {
        laws: null,
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}
