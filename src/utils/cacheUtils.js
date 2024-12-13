const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export const cacheManager = {
    cache: new Map(),

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }
        return item.data;
    },

    set(key, data) {
        this.cache.set(key, {
            data,
            expiry: Date.now() + CACHE_DURATION
        });
    }
}; 