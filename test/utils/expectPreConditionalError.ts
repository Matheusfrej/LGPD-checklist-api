import { expect } from "vitest";
import {
  ErrorEntity,
  NO_PERMISSION_MESSAGE,
  PRE_CONDITIONAL_ERROR_CODE,
} from "../../src/domain/entity/error";

function expectPreConditionalError({
  error,
  noPermission,
}: {
  error: ErrorEntity;
  noPermission?: boolean;
}) {
  expect(error).toBeInstanceOf(ErrorEntity);
  expect(error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  if (noPermission) {
    expect(error.message).toBe(NO_PERMISSION_MESSAGE);
  }
}

export { expectPreConditionalError };
