import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../api/firebase";
import { Leaf } from "lucide-react";

// Google provider (create once)
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email + Password login
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithPopup(auth, googleProvider);
      window.location.href = "/";
    } catch {
      setError("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-stone-50 to-amber-50 px-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-stone-200 p-10">

        {/* Header */}
        <div className="text-center mb-10">
          <Leaf className="mx-auto text-amber-800 mb-4 animate-pulse" size={48} />
          <h1 className="text-4xl font-serif text-stone-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-stone-500">
            Continue your journey
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-4 rounded-xl border border-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-700"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 rounded-xl border border-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-700"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* Email login */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition-all duration-300 shadow-xl"
          >
            {loading ? "Entering..." : "Login"}
          </button>

          {/* Google login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 border border-stone-300 rounded-full bg-white hover:bg-stone-100 transition-all duration-300 flex items-center justify-center gap-3 shadow"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-stone-700 font-medium">
              Continue with Google
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-stone-500 text-sm mt-8">
          New here?{" "}
          <a href="/signup" className="text-amber-800 hover:underline">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}
