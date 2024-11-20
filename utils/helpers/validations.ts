export const required = (value: string) => {
  if (!value) {
    return "This field is required";
  }
};

export const email = (value: string) => {
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    return "Invalid email address";
  }
};

export const length = (value: string, min: number, max: number = 0) => {
  if (min && value.length < min) {
    return `Must be at least ${min} characters`;
  }

  if (max && value.length > max) {
    return `Must be at most ${max} characters`;
  }
};

export const match = (value: string, matchValue: string) => {
  if (value !== matchValue) {
    return "Does not match";
  }
};

export const phone = (value: string) => {
  // phone should start with 7 or 6, and should be 8 digits long
  if (!/^[6-7]\d{7}$/.test(value)) {
    return "Invalid phone number";
  }
};

export const isFormValid = (
  fieldsValidation: Array<Array<String | undefined>>
): boolean => {
  for (let fieldErrors of fieldsValidation) {
    for (let error of fieldErrors) {
      if (error !== undefined) {
        return false;
      }
    }
  }
  return true;
};
