import { useField } from "vee-validate";
import validator from "validator";
const { isNumeric, isLength } = validator;

// 手機末三碼
export const checkLastThreeDigits = (inputName) =>
  useField(inputName || "last3Digits", (mobileLast3Number) => {
    if (!mobileLast3Number) return "手機末三碼必填";
    if (!isNumeric(mobileLast3Number)) return "請輸入數字格式";
    if (!isLength(mobileLast3Number, { min: 3 }))
      return "手機末三碼長度錯誤 (最少三碼)";

    return true;
  });
