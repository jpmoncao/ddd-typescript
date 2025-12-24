import Redis from 'ioredis';
import { CacheProvider } from '../../application/providers/cache.provider';
import { redisConn } from '../database/redis/conn';

export class RedisCacheProvider implements CacheProvider {
    private client: Redis;

    constructor() {
        this.client = redisConn;
    }

    async save(key: string, value: any, ttlSeconds = 60): Promise<void> {
        await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    }

    async get<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if (!data)
            return null;

        try {
            return JSON.parse(data) as T;
        } catch {
            return null;
        }
    }

    async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }

    async invalidatePrefix(prefix: string): Promise<void> {
        const keys = await this.client.keys(`${prefix}:*`);
        if (keys.length > 0) {
            const pipeline = this.client.pipeline();
            keys.forEach((key) => pipeline.del(key));
            await pipeline.exec();
        }
    }
}