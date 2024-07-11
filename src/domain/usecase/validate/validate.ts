import { Json } from "../../@types";
import * as z from "zod";
import { DEFAULT_VALIDATION_MESSAGE } from "../../entity/error";

function checkEmpty(paramether: string | number | number[] | Json): boolean {
  if (typeof paramether === "string") {
    paramether = paramether.trim();
  }

  return paramether === "" || paramether === undefined || paramether === null;
}

const requiredErrorMessage = (fieldName: string) =>
  `${fieldName} não pode ser vazio.`;

const zodStringSchema = (fieldName: string, minLength?: number) => {
  let schema = z.string({
    invalid_type_error: `${fieldName} deve ser uma string`,
    required_error: requiredErrorMessage(fieldName),
  });

  if (minLength) {
    schema = schema.min(minLength, requiredErrorMessage(fieldName));
  }

  return schema;
};

const zodNumberSchema = (
  fieldName: string,
  minValue?: number,
  maxValue?: number,
) => {
  let schema = z.number({
    invalid_type_error: `${fieldName} deve ser um número`,
    required_error: `${fieldName} não pode ser vazio.`,
  });

  if (minValue) {
    schema = schema.min(
      minValue,
      `${fieldName} deve ser maior ou igual a ${minValue}`,
    );
  }

  if (maxValue) {
    schema = schema.max(
      maxValue,
      `${fieldName} deve ser menor ou igual a ${maxValue}`,
    );
  }

  return schema;
};

function zodErrorTreatment(error: unknown): string {
  if (error instanceof z.ZodError) {
    const firstError = error.errors[0];
    return firstError.message;
  }
  return DEFAULT_VALIDATION_MESSAGE;
}

export const validateWithZod = async (
  validationSchemaParse: () => void,
  customValidation?: () => Promise<string | null>,
): Promise<string> => {
  try {
    validationSchemaParse();

    if (customValidation) {
      const customError = await customValidation();
      if (customError) {
        return customError;
      }
    }

    return null;
  } catch (error) {
    return zodErrorTreatment(error);
  }
};

export { checkEmpty, zodStringSchema, zodNumberSchema };
