import { Json } from "../../../@types";
import * as z from "zod";
import { DEFAULT_VALIDATION_MESSAGE } from "../../../entity/error";

const requiredErrorMessage = (fieldName: string) =>
  `${fieldName} não pode ser vazio.`;

const zodStringSchema = (
  fieldName: string,
  minLength?: number,
  maxLength?: number,
) => {
  let schema = z.string({
    invalid_type_error: `${fieldName} deve ser uma string`,
    required_error: requiredErrorMessage(fieldName),
  });

  if (minLength) {
    schema = schema.min(
      minLength,
      minLength === 1
        ? requiredErrorMessage(fieldName)
        : `${fieldName} deve ter no mínimo ${minLength} caracteres`,
    );
  }

  if (maxLength) {
    schema = schema.max(
      maxLength,
      `${fieldName} deve ter no máximo ${maxLength} caracteres`,
    );
  }

  return schema;
};

const zodBooleanSchema = (fieldName: string) => {
  return z.boolean({
    invalid_type_error: `${fieldName} deve ser um boolean`,
    required_error: requiredErrorMessage(fieldName),
  });
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

const validateWithZod = async (
  validationSchemaParse: () => void,
  customValidation?: () => Promise<string | null>,
): Promise<string | null> => {
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

const isNonEmptyJson = (val: unknown): val is Json => {
  try {
    const parsed = JSON.parse(JSON.stringify(val));
    return (
      typeof parsed === "object" &&
      parsed !== null &&
      (Array.isArray(parsed)
        ? parsed.length > 0
        : Object.keys(parsed).length > 0)
    );
  } catch (e) {
    return false;
  }
};

export {
  zodStringSchema,
  zodNumberSchema,
  zodBooleanSchema,
  validateWithZod,
  isNonEmptyJson,
};
