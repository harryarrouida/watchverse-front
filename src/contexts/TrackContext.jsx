import { createContext, useContext, useState, useEffect } from "react";
import {
  getByStatus,
  addWithCustomStatus,
  updateStatus,
} from "../services/tracker/trackerServices";

const TrackContext = createContext();

export function TrackProvider({ children }) {
  const [watching, setWatching] = useState([]);
  const [watched, setWatched] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateTrackLists = async () => {
    try {
      const watchingData = await getByStatus("watching");
      const watchedData = await getByStatus("watched");
      const toWatchData = await getByStatus("to watch");

      if (Array.isArray(watchingData)) setWatching(watchingData);
      if (Array.isArray(watchedData)) setWatched(watchedData);
      if (Array.isArray(toWatchData)) setToWatch(toWatchData);

      setError(null);
    } catch (err) {
      console.error("Error updating track lists:", err);
      setError("Failed to update lists");
    }finally{
        setLoading(false);
    }
  };

  const handleAddWithCustomStatus = async (show, status) => {
    try {
      setLoading(true);
      const response = await addWithCustomStatus(show, status);
      if (response) {
        await updateTrackLists(); // Refresh all lists after adding
        return response;
      }
    } catch (err) {
      console.error("Error adding show with custom status:", err);
      setError("Failed to add show");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await updateStatus(id, newStatus);
      if (response) {
        await updateTrackLists(); // Refresh all lists after updating
        return response;
      }
    } catch (err) {
      console.error("Error updating show status:", err);
      setError("Failed to update status");
      return null;
    }finally{
        setLoading(false);
    }
  };

  // Initial fetch of data
  useEffect(() => {
    if (localStorage.getItem("token")) {
      updateTrackLists();
    } else {
      setLoading(false);
    }
  }, []);

  // Create the context value object
  const value = {
    watching,
    watched,
    toWatch,
    loading,
    error,
    updateTrackLists,
    addWithCustomStatus: handleAddWithCustomStatus,
    updateStatus: handleUpdateStatus,
    setWatching,
    setWatched,
    setToWatch
  };

  return (
    <TrackContext.Provider value={value}>
      {children}
    </TrackContext.Provider>
  );
}

// Custom hook with error handling
export const useTrack = () => {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error('useTrack must be used within a TrackProvider');
  }
  return context;
};
