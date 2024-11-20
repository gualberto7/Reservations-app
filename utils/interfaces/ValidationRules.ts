export type ValidationRuleName =
  | "required"
  | "string"
  | "email"
  | "min"
  | "max"
  | "match";

export interface ValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}
