import { Json } from "../../@types";

function checkEmpty(paramether: string | number | number[] | Json): boolean {
  if (typeof paramether === "string") {
    paramether = paramether.trim();
  }

  return paramether === "" || paramether === undefined || paramether === null;
}

function checkStringEmpty(paramether: string): boolean {
  return (
    paramether === undefined || paramether === null || paramether.trim() === ""
  );
}

function checkNumberEmpty(paramether: number): boolean {
  return (
    paramether === undefined || paramether === null || Number.isNaN(paramether)
  );
}

function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password: string): boolean {
  const passwordValidation =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/;

  return passwordValidation.test(password);
}

export {
  checkEmpty,
  checkStringEmpty,
  checkNumberEmpty,
  validateEmail,
  validatePassword,
};
