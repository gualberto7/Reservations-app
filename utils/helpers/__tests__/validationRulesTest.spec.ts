// @vitest-environment node
import { describe, expect, it } from "vitest";
import rules from "../validationRules";

describe("Validation rules tests", () => {
  it("required rule", () => {
    expect(rules.required("")).toEqual({
      isValid: false,
      errorMessage: "This field is required",
    });
    expect(rules.required("test")).toEqual({
      isValid: true,
      errorMessage: null,
    });
  });

  it("string rule", () => {
    expect(rules.string(1)).toEqual({
      isValid: false,
      errorMessage: "This field must be a string",
    });
    expect(rules.string("test")).toEqual({
      isValid: true,
      errorMessage: null,
    });
  });

  it("email rule", () => {
    expect(rules.email("test")).toEqual({
      isValid: false,
      errorMessage: "This field must be a valid email",
    });
    expect(rules.email("invalid-email.com")).toEqual({
      isValid: false,
      errorMessage: "This field must be a valid email",
    });
    expect(rules.email("validemail@test.com")).toEqual({
      isValid: true,
      errorMessage: null,
    });
  });

  it("min rule", () => {
    expect(rules.min("test", 5)).toEqual({
      isValid: false,
      errorMessage: "This field must have at least 5 characters",
    });
    expect(rules.min("test", 3)).toEqual({
      isValid: true,
      errorMessage: null,
    });
  });

  it("max rule", () => {
    expect(rules.max("test", 3)).toEqual({
      isValid: false,
      errorMessage: "This field must have less than 3 characters",
    });
    expect(rules.max("test", 5)).toEqual({
      isValid: true,
      errorMessage: null,
    });
  });

  it("match rule", () => {
    expect(rules.match("test", "test1")).toEqual({
      isValid: false,
      errorMessage: "This field must match",
    });
    expect(rules.match("test", "test")).toEqual({
      isValid: true,
      errorMessage: null,
    });
  });
});
