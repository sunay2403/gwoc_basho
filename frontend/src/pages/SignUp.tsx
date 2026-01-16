import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../api/firebase";
import { Leaf } from "lucide-react";
import { syncUserWithBackend } from "../api/authSync";

// Google provider
const googleProvider = new GoogleAuthProvider();

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // Email + Password signup (with verification)
  // -------------------------------
  const handleSignup = async () => {
    if (!fullName || !username || !email || !password) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await createUserWithEmailAndPassword(auth, email, password);

      // 🔔 Send verification email
      await sendEmailVerification(res.user);

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        fullName,
        username,
        email,
        phone,
        bio: "",
        location: "",
        role: "user",
        authProvider: "password",
        emailVerified: false,
        createdAt: serverTimestamp(),
      });

      alert("Verification email sent. Please check your inbox.");

      // ❗ Force logout until verified
      await auth.signOut();
      window.location.href = "/login";
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Google signup (already verified)
  // -------------------------------
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          fullName: user.displayName || "",
          username: user.email?.split("@")[0] || "",
          email: user.email,
          phone: user.phoneNumber || "",
          bio: "",
          location: "",
          role: "user",
          authProvider: "google",
          emailVerified: true,
          createdAt: serverTimestamp(),
        });
      }

      await syncUserWithBackend(user);
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
            Begin Your Journey
          </h1>
          <p className="text-stone-500">
            Create an account to enter the world of Bashō
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-5 py-4 rounded-xl border border-stone-300 bg-stone-50"
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            className="w-full px-5 py-4 rounded-xl border border-stone-300 bg-stone-50"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone (optional)"
            className="w-full px-5 py-4 rounded-xl border border-stone-300 bg-stone-50"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-4 rounded-xl border border-stone-300 bg-stone-50"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 rounded-xl border border-stone-300 bg-stone-50"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-4 bg-amber-800 text-white rounded-full hover:bg-amber-900 shadow-xl"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full py-4 border border-stone-300 rounded-full bg-white hover:bg-stone-100 flex items-center justify-center gap-3 shadow"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>

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
