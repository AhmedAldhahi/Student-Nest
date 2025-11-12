export function stringifyPayload<T extends Record<string, any>>(
  payload: T
): Record<keyof T, string> {
  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => {
      if (value instanceof Date) return [key, value.toISOString()];
      return [key, String(value)];
    })
  ) as Record<keyof T, string>;
}
