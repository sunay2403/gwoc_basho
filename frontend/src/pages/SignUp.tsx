import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../api/firebase";
import { Leaf } from "lucide-react";

// Google provider (create once)
const googleProvider = new GoogleAuthProvider();

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email + Password signup
  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google signup
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithPopup(auth, googleProvider);
      window.location.href = "/";
    } catch (err) {
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
            Begin Your Journey
          </h1>
          <p className="text-stone-500">
            Create an account to enter the world of Bashō
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

          {/* Email signup */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-4 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition-all duration-300 shadow-xl"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {/* Google signup */}
          <button
            onClick={handleGoogleSignup}
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
          Already have an account?{" "}
          <a href="/login" className="text-amber-800 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
