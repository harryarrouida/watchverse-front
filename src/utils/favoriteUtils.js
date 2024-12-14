import { 
  addFavorite as addFavoriteService, 
  removeFavorite as removeFavoriteService,
  getFavorites 
} from '../services/tracker/trackerServices';

export const toggleFavorite = async (item, isFavorite) => {
  try {
    const favorite = {
      title: item.title || item.name,
      type: item.type || "tv",
      poster_path: item.poster_path,
      tmdbId: item.tmdbId || item.id,
      vote_average: item.vote_average,
      _id: item._id
    };

    if (isFavorite) {
      // If we don't have _id (like in Shows page), we need to find it first
      if (!item._id) {
        const favorites = await getFavorites();
        const existingFavorite = favorites.find(f => f.tmdbId === (item.tmdbId || item.id));
        if (existingFavorite) {
          await removeFavoriteService(existingFavorite._id);
        }
      } else {
        await removeFavoriteService(item._id);
      }
      return false;
    } else {
      await addFavoriteService(favorite);
      return true;
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return isFavorite;
  }
};
