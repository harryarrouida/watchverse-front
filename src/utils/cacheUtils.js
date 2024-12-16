// src/utils/cacheUtils.js
const CACHE_TTL = {
  SHORT: 1000 * 60 * 5,    // 5 minutes
  MEDIUM: 1000 * 60 * 30,  // 30 minutes
  LONG: 1000 * 60 * 60     // 1 hour
};

export const CACHE_KEYS = {
  HERO_SHOW: 'hero-show',
  TRENDING_MOVIES: 'trending-movies',
  POPULAR_MOVIES: 'popular-movies',
  TOP_RATED_MOVIES: 'top-rated-movies',
  TRENDING_SHOWS: 'trending-shows',
  POPULAR_SHOWS: 'popular-shows',
  TOP_RATED_SHOWS: 'top-rated-shows',
  ON_THE_AIR_SHOWS: 'on-the-air-shows',
  TRENDING_ANIME: 'trending-anime',
  POPULAR_ANIME: 'popular-anime',
  MOVIE_DETAILS: (id) => `movie-details-${id}`,
  SHOW_DETAILS: (id) => `show-details-${id}`,
  SEARCH_RESULTS: (query) => `search-${query}`
};

export const setWithExpiry = (key, value, ttl = CACHE_TTL.MEDIUM) => {
  const item = {
    value: value,
    timestamp: new Date().getTime(),
    ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date().getTime();

  if (now - item.timestamp > (item.ttl || CACHE_TTL.MEDIUM)) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const cacheManager = {
  set: setWithExpiry,
  get: getWithExpiry,
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear()
};