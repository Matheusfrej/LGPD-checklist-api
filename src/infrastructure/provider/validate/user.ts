import * as userInterface from "@/domain/usecase/validate/user";
import { CreateUserUseCaseRequest } from "../../../domain/usecase/ucio/user";
import { checkEmpty, validateEmail } from "./validate";
import { checkUserByEmailExists } from "../../internal/database/postgresql/user";

class CreateUserUseCaseValidate
  implements userInterface.CreateUserUseCaseValidateInterface
{
  async createUser(req: CreateUserUseCaseRequest): Promise<string> {
    if (checkEmpty(req.name)) {
      return "O nome do usuário não pode ser vazio.";
    }

    if (checkEmpty(req.office)) {
      return "A função/cargo não pode ser vazia";
    }

    if (checkEmpty(req.email)) {
      return "O email não pode ser vazio.";
    }

    if (checkEmpty(req.password)) {
      return "A senha não pode ser vazia.";
    }

    if (!validateEmail(req.email)) {
      return "Insira o email no formato correto.";
    }

    if (await checkUserByEmailExists(req.email, null)) {
      return "O email informado já existe.";
    }

    return null;
  }
}

export { CreateUserUseCaseValidate };
