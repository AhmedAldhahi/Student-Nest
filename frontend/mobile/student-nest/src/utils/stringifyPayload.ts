export function stringifyPayload<T extends Record<string, any>>(payload: T): T {
  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => {
      if (value instanceof Date) return [key, value.toISOString()];
      if (typeof value === "number") return [key, String(value)];
      return [key, value]; // keep strings and booleans as they are
    })
  ) as T;
}
