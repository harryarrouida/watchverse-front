import { addFavorite as addFavoriteService, removeFavorite as removeFavoriteService } from '../services/tracker/favoritesServices';

export const toggleFavorite = async (item, isFavorite) => {
  try {
    const favorite = {
      title: item.title || item.name,
      type: "tv",
      poster_path: item.poster_path,
      tmdbId: item.id,
      vote_average: item.vote_average,
    };

    if (isFavorite) {
      await removeFavoriteService(item._id);
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
