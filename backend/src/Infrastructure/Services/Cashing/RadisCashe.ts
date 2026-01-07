import Redis from "ioredis";
import { ICashMemoryService } from "../../../Application/Interfaces/ICash.interface";

export class RedisCashService implements ICashMemoryService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
    });
  }

  async set<T>(key: string, value: T, expiration?: number): Promise<void> {
    const data = JSON.stringify(value);
    expiration = 36000;
    await this.client.set(key, data, "EX", expiration);
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async clear(): Promise<void> {
    await this.client.flushdb();
  }
}

