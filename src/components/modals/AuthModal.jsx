import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthModal({ isOpen, onClose }) {
  const { loginUser, registerUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        console.log("logging in", email, password);
        await loginUser(email, password);
      } else {
        console.log("registering", username, email, password);
        await registerUser(username, email, password);
      }
      onClose();
    } catch (error) {
      console.error("Auth error:", error);
      setError(error.message || "An error occurred during authentication");
    }
  };

  const handleModalClose = (e) => {
    if (e.target === e.currentTarget || e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    const cleanup = () => {
      setEmail("");
      setPassword("");
      setUsername("");
      setError("");
    };

    if (!isOpen) {
      cleanup();
    }

    return cleanup;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={handleModalClose}
      onKeyDown={handleModalClose}
      tabIndex={0}
    >
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg w-96 relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </>
          )}

          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/10 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-500 hover:text-purple-400 ml-2"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
