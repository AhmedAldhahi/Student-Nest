export interface ICashMemoryService {
  set<T>(key: string, value: T, expiration?: number): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  delete(key:string) : Promise<void>;
  clear() : Promise<void>
} 



