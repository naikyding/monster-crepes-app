import { useField } from "vee-validate";

// 手機未三碼
export const checkLastThreeDigits = (inputName) =>
  useField(inputName || "last3Digits", (value) => {
    if (!value) {
      return "手機未三碼必填";
    }
    if (value.length < 3) {
      return "手機未三碼不足 3 位數";
    }
    if (value.length > 3) {
      return "手機未三碼超過 3 位數";
    }
    return true;
  });
