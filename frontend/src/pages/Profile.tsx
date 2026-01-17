import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../api/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

type UserProfile = {
  fullName: string;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
  role: string;
  authProvider: "password" | "google";
  createdAt?: any;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(userRef);

        // Auto-create profile if missing
        if (!snap.exists()) {
          const provider: "google" | "password" =
            currentUser.providerData[0]?.providerId === "google.com"
              ? "google"
              : "password";

          const newProfile: UserProfile = {
            fullName: currentUser.displayName || "",
            username: currentUser.email?.split("@")[0] || "",
            email: currentUser.email || "",
            phone: currentUser.phoneNumber || "",
            bio: "",
            location: "",
            role: "user",
            authProvider: provider,
            createdAt: new Date(),
          };

          await setDoc(userRef, newProfile);
          setProfile(newProfile);
        } else {
          setProfile(snap.data() as UserProfile);
        }
      } catch (err) {
        console.error("Profile load error:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  /* ---------- Render states ---------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-500">
        Loading profile…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Not logged in
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "Profile not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDD8B4]/15 flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-stone-200 p-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-[#C85428] text-white flex items-center justify-center text-3xl font-medium mb-6">
            {profile.fullName?.[0]?.toUpperCase() ||
              profile.email?.[0]?.toUpperCase()}
          </div>

          <h1 className="text-3xl font-serif text-stone-800 mb-1">
            {profile.fullName}
          </h1>

          <p className="text-stone-500 text-sm">
            @{profile.username}
          </p>
        </div>

        {/* Profile Info */}
        <div className="space-y-6 text-sm">
          <ProfileRow label="Email" value={profile.email} />
          <ProfileRow label="Username" value={profile.username} />
          <ProfileRow label="Phone" value={profile.phone || "—"} />
          <ProfileRow label="Bio" value={profile.bio || "—"} />
          <ProfileRow label="Location" value={profile.location || "—"} />
          <ProfileRow label="Role" value={profile.role} />
          <ProfileRow
            label="Provider"
            value={profile.authProvider === "google" ? "Google" : "Email & Password"}
          />
          <ProfileRow
            label="Joined"
            value={
              profile.createdAt
                ? new Date(
                    profile.createdAt.seconds
                      ? profile.createdAt.seconds * 1000
                      : profile.createdAt
                  ).toLocaleDateString()
                : "—"
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-12">
          <button
            onClick={() => navigate("/purchase-history")}
            className="w-full px-6 py-3 rounded-full bg-[#C85428] text-white text-sm uppercase tracking-widest font-semibold hover:bg-[#B84623] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Purchase History
          </button>

          <button
            onClick={() => signOut(auth)}
            className="w-full px-6 py-3 rounded-full border border-[#C85428]/60 text-sm uppercase tracking-widest text-[#C85428] hover:bg-[#C85428] hover:text-white transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

/* ---------- Reusable row ---------- */
const ProfileRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between items-center border-b border-stone-200 pb-4">
    <span className="text-stone-500 uppercase tracking-widest">
      {label}
    </span>
    <span className="text-stone-800 text-right max-w-[60%]">
      {value}
    </span>
  </div>
);