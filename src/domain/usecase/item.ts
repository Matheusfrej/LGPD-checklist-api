import { ItemRepositoryInterface } from "./repository/item";
import * as validate from "../usecase/validate/item";
import * as ucio from "../usecase/ucio/item";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  newInternalServerError,
  newPreConditionalError,
  TAG_INTERNAL_SERVER_ERROR,
  TAG_PRE_CONDITIONAL_ERROR,
} from "../entity/error";
import { LawRepositoryInterface } from "./repository/law";
import { DeviceRepositoryInterface } from "./repository/device";

export class ListItemsUseCase {
  public validate: validate.ListItemsUseCaseValidate;
  private itemRepository: ItemRepositoryInterface;

  constructor(
    itemRepository: ItemRepositoryInterface,
    lawRepository: LawRepositoryInterface,
    deviceRepository: DeviceRepositoryInterface,
  ) {
    this.itemRepository = itemRepository;
    this.validate = new validate.ListItemsUseCaseValidate(
      lawRepository,
      deviceRepository,
    );
  }

  async execute(
    req: ucio.ListItemsUseCaseRequest,
  ): Promise<ucio.ListItemsUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const items = await this.itemRepository.list(req);
        return {
          items,
          error: null,
        };
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return {
          items: null,
          error: newPreConditionalError(messageError),
        };
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return {
        items: null,
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}
