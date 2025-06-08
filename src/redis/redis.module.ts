import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { RedisService } from '.';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379'),
        ttl: 60 * 60 * 24, // 24 horas
        isGlobal: true,
        max: 1000,
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {} 