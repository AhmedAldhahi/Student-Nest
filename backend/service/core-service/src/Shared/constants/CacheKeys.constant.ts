export class CacheKeys {
  public static Profile(userId: string): string {
    return `profile : ${String(userId).trim()}`;
  }
}
