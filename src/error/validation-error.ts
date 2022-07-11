import { default as mercurius } from "mercurius";

interface ValidationField {
  field: string;
  message: string;
}

export class ValidationError extends mercurius.ErrorWithProps {
  constructor(fields: ValidationField[]) {
    super("Inputs do not pass validation", { code: "VALIDATION", fields }, 400);
  }
}
