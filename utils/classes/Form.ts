// Form.ts

import { reactive, ref, watch } from "vue";
import ValidationRules from "~/utils/helpers/validationRules";
import type { ValidationRuleName } from "~/utils/interfaces/ValidationRules";

export default class Form<T extends Record<string, any>> {
  public model: T;
  public rules: { [key: string]: string } = {};
  public processing: Ref<boolean>;
  public errors: Record<string, string> = reactive({});
  public labels: Record<string, string> = reactive({});
  public isValid = ref(false);
  private nuxtApp: any;

  constructor(model: T) {
    this.model = reactive(model) as T;
    this.processing = ref(false);
    this.nuxtApp = useNuxtApp();

    watch(
      this.model,
      () => {
        this.validate();
      },
      { deep: true }
    );
  }

  public setErrors(errors: string[]): void {
    for (const error of errors) {
      const key = error.split(" ")[0];
      this.errors[key] = error;
    }

    console.log(this.errors);
  }

  public clearErrors(): void {
    this.errors = {};
  }

  public validate() {
    const keys = Object.keys(this.rules);
    for (const key of keys) {
      const rules = this.rules[key].split("|");
      for (const rule of rules) {
        let [ruleName, ruleValue] = rule.split(":");
        const value = this.model[key];
        const validationRule = ValidationRules[ruleName as ValidationRuleName];
        if (!validationRule) {
          throw new Error(`Validation rule ${ruleName} is not defined`);
        }
        if (ruleValue && ruleValue.startsWith("f-")) {
          ruleValue = this.model[ruleValue.substring(2)];
        }
        const { isValid, errorMessage } = validationRule(value, ruleValue);
        if (!isValid) {
          this.errors[key] = errorMessage ?? "";
          break;
        }
        delete this.errors[key];
      }
    }
    if (Object.keys(this.errors).length === 0) this.isValid.value = true;
    else this.isValid.value = false;
  }

  public async submitForm(url: string, method: string = "POST"): Promise<any> {
    this.processing.value = true;
    try {
      const response = await this.nuxtApp.$fetch(url, {
        method,
        body: JSON.stringify(this.model),
      });
      return response;
    } catch (error: any) {
      if (error.response) {
        //this.setErrors(error.response.data.errors);
        console.log(error.response.data.errors);
      }
    } finally {
      this.processing.value = false;
    }
  }
}
