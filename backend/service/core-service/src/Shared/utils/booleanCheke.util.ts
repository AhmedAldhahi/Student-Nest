export function booleanCheckFromString2BooleanHelper(value: string) {
  if (value === "false") return false;
  if (value === "true") return true;
  throw new Error("invalid value !!");
}
