export interface Form {
  model: Record<string, any>;
  rules: Record<string, string>;
  errors: Record<string, string>;
  labels: Record<string, string>;
  processing: Ref<boolean>;
  isValid: Ref<boolean>;
}
