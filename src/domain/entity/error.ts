const INTERNAL_SERVER_ERROR_CODE = 1;
const PRE_CONDITIONAL_ERROR_CODE = 2;
const TAG_INTERNAL_SERVER_ERROR = "[INTERNAL SERVER ERROR]";
const TAG_PRE_CONDITIONAL_ERROR = "[PRE CONDITIONAL ERROR]";
const INTERNAL_SERVER_ERROR_MESSAGE = "Erro interno do servidor";

class ErrorEntity {
  private code: number;
  private message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}

function newInternalServerError(message: string): ErrorEntity {
  return new ErrorEntity(INTERNAL_SERVER_ERROR_CODE, message);
}

function newPreConditionalError(message: string): ErrorEntity {
  return new ErrorEntity(PRE_CONDITIONAL_ERROR_CODE, message);
}

export {
  ErrorEntity,
  newInternalServerError,
  newPreConditionalError,
  TAG_INTERNAL_SERVER_ERROR,
  TAG_PRE_CONDITIONAL_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
};
