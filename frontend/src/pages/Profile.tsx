import { useEffect, useState } from "react";
import { auth } from "../api/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#EDD8B4]/15 flex items-center justify-center px-6">
      <div
        className="
          w-full max-w-lg
          bg-white/80 backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          border border-stone-200
          p-10
        "
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          {/* Avatar */}
          <div
            className="
              w-20 h-20 rounded-full
              bg-[#C85428]
              text-white
              flex items-center justify-center
              text-3xl font-medium
              mb-6
            "
          >
            {user.email?.[0]?.toUpperCase()}
          </div>

          <h1 className="text-3xl font-serif text-stone-800 mb-2">
            Your Profile
          </h1>
          <p className="text-stone-500 text-sm">
            Account & identity
          </p>
        </div>

        {/* Info */}
        <div className="space-y-6 text-sm">
          <div className="flex justify-between items-center border-b border-stone-200 pb-4">
            <span className="text-stone-500 uppercase tracking-widest">
              Email
            </span>
            <span className="text-stone-800">
              {user.email}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-stone-200 pb-4">
            <span className="text-stone-500 uppercase tracking-widest">
              Provider
            </span>
            <span className="text-stone-800 capitalize">
              {user.providerData[0]?.providerId === "google.com"
                ? "Google"
                : "Email & Password"}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut(auth)}
          className="
            mt-12 w-full
            px-6 py-3 rounded-full
            border border-[#C85428]/60
            text-sm uppercase tracking-widest
            text-[#C85428]
            hover:bg-[#C85428] hover:text-white
            transition-all duration-300
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
