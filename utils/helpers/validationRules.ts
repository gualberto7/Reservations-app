/* 
    ValidationRules.ts
    This file contains validation rules that are used in the form validation process.
*/

import { type ValidationResult } from "~/utils/interfaces/ValidationRules";

const required = (value: any): ValidationResult => {
  if (value.trim() !== "") return { isValid: true, errorMessage: null };

  return { isValid: false, errorMessage: "This field is required" };
};

const string = (value: any): ValidationResult => {
  if (typeof value === "string") return { isValid: true, errorMessage: null };

  return { isValid: false, errorMessage: "This field must be a string" };
};

const email = (value: any): ValidationResult => {
  const re = /\S+@\S+\.\S+/;
  if (re.test(value)) return { isValid: true, errorMessage: null };

  return { isValid: false, errorMessage: "This field must be a valid email" };
};

const min = (value: any, length: any): ValidationResult => {
  if (value.length >= length) return { isValid: true, errorMessage: null };

  return {
    isValid: false,
    errorMessage: `This field must have at least ${length} characters`,
  };
};

const max = (value: any, length: any): ValidationResult => {
  if (value.length <= length) return { isValid: true, errorMessage: null };

  return {
    isValid: false,
    errorMessage: `This field must have less than ${length} characters`,
  };
};

const match = (value: any, matchValue: any): ValidationResult => {
  if (value === matchValue) return { isValid: true, errorMessage: null };

  return { isValid: false, errorMessage: "This field must match" };
};

const validationRules = {
  required,
  string,
  email,
  min,
  max,
  match,
};

export default validationRules;
