export interface ICashMemoryService {
  set<T>(key: string, value: T, expiration?: number): Promise<Boolean>;
  get<T>(key: string): Promise<T | null>;
  exist(key:string) : Promise<boolean>;
  delete(key:string) : Promise<boolean>;
  clear() : Promise<Boolean>
}



