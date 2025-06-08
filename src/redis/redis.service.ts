import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisCache } from './redis.types';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {}

  async setToken(key: string, value: string, ttl?: number): Promise<string> {
    return await this.cacheManager.set(key, value, ttl);
  }

  async getToken(key: string): Promise<string | null> {
    return await this.cacheManager.get<string>(key);
  }

  async deleteToken(key: string): Promise<boolean> {
    return await this.cacheManager.del(key);
  }

  async existsToken(key: string): Promise<boolean> {
    const value = await this.cacheManager.get<string>(key);
    return value !== null && value !== undefined;
  }
} 