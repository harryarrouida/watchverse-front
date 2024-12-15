import { AuthProvider } from "./AuthContext";
import { TrackProvider } from "./TrackContext";
import { FavoritesProvider } from "./FavoritesContext";

export const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            <TrackProvider>
                <FavoritesProvider>{children}</FavoritesProvider>
            </TrackProvider>
        </AuthProvider>
    );
}