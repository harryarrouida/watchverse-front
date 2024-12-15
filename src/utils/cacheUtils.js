const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export const CACHE_KEYS = {
  HERO_SHOW: 'hero-show',
  // other keys...
};

export const setWithExpiry = (key, value) => {
  const item = {
    value: value,
    timestamp: new Date().getTime()
  }
  localStorage.setItem(key, JSON.stringify(item));
}

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date().getTime();

  if (now - item.timestamp > CACHE_TTL) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
} 