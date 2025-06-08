import { Cache } from 'cache-manager';

export interface RedisCache extends Cache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<T>;
  del(key: string): Promise<boolean>;
} 