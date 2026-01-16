
import { useEffect, useState } from "react";
import { auth, db } from "../api/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { Leaf, User as UserIcon, Mail, Phone, MapPin, Calendar, Shield, LogOut, Camera } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center text-stone-500 bg-stone-50">
        <div className="flex flex-col items-center animate-pulse">
          <Leaf className="text-amber-800 mb-4" size={48} />
          <p className="font-serif text-xl">Loading your sanctuary...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-500 font-serif text-xl">Please log in to view your profile.</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-stone-50">
        {error || "Profile not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-24 px-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 flex flex-col md:flex-row">

        {/* Sidebar / Left Panel */}
        <div className="md:w-1/3 bg-linear-to-b from-stone-900 to-stone-800 text-white p-12 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Leaf size={120} />
          </div>

          <div className="relative z-10">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-amber-500 to-amber-700 p-1 mb-6 shadow-xl mx-auto">
              <div className="w-full h-full rounded-full bg-stone-800 flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={profile.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-serif text-amber-500">
                    {profile.fullName?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-serif mb-2 tracking-wide">
              {profile.fullName}
            </h1>
            <p className="text-stone-400 text-sm mb-8 font-light">
              @{profile.username}
            </p>

            <button
              onClick={() => signOut(auth)}
              className="group flex items-center space-x-2 px-6 py-2 rounded-full border border-stone-600 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 text-sm tracking-widest uppercase"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>

          <div className="mt-auto pt-12 text-stone-500 text-xs">
            Member since {new Date(profile.createdAt?.seconds ? profile.createdAt.seconds * 1000 : profile.createdAt).getFullYear()}
          </div>
        </div>

        {/* Main Content / Right Panel */}
        <div className="md:w-2/3 p-12">
          <div className="flex items-center space-x-3 mb-8">
            <Leaf className="text-amber-800" size={24} />
            <h2 className="text-3xl font-serif text-stone-800">Your Journey</h2>
          </div>

          <div className="grid gap-6">
            <ProfileCard icon={<Mail size={20} />} label="Email" value={profile.email} />
            <ProfileCard icon={<Phone size={20} />} label="Phone" value={profile.phone || "Not provided"} />
            <ProfileCard icon={<MapPin size={20} />} label="Location" value={profile.location || "Not provided"} />
            <ProfileCard icon={<UserIcon size={20} />} label="Bio" value={profile.bio || "Tell us about yourself..."} />

            <div className="grid grid-cols-2 gap-6 mt-4">
              <ProfileCard
                icon={<Shield size={20} />}
                label="Role"
                value={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                compact
              />
              <ProfileCard
                icon={<Calendar size={20} />}
                label="Joined"
                value={profile.createdAt ? new Date(profile.createdAt.seconds ? profile.createdAt.seconds * 1000 : profile.createdAt).toLocaleDateString() : "—"}
                compact
              />
            </div>
          </div>

          <div className="mt-10 p-6 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="flex items-center space-x-3 mb-4">
              <Camera className="text-stone-400" size={20} />
              <h3 className="font-serif text-stone-700">Recent Activity</h3>
            </div>
            <p className="text-stone-500 text-sm italic">
              You haven't booked any workshops or ordered items yet. <br />
              <span className="text-amber-700 cursor-pointer hover:underline">Explore our collection</span> to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

interface ProfileCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  compact?: boolean;
}

const ProfileCard = ({ icon, label, value, compact }: ProfileCardProps) => (
  <div className={`flex items-center space-x-4 p-4 rounded-xl hover:bg-stone-50 transition-colors duration-300 border border-transparent hover:border-stone-100 ${compact ? 'bg-stone-50/50' : ''}`}>
    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
      {icon}
    </div>
    <div className="overflow-hidden">
      <p className="text-xs text-stone-500 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-stone-800 font-medium truncate">{value}</p>
    </div>
  </div>
);