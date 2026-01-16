import { useEffect, useState } from "react";
import { auth, db } from "../api/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import {
  Leaf,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  LogOut,
  Edit3,
  Save,
  X,
} from "lucide-react";

/* ================= TYPES ================= */

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

interface EditableRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  editMode?: boolean;
  textarea?: boolean;
  onChange?: (value: string) => void;
}

interface StaticRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

/* ================= COMPONENT ================= */

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [form, setForm] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* -------- Load Profile -------- */

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          const provider =
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

          await setDoc(ref, newProfile);
          setProfile(newProfile);
          setForm(newProfile);
        } else {
          const data = snap.data() as UserProfile;
          setProfile(data);
          setForm(data);
        }
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  /* -------- Save Profile -------- */

  const saveProfile = async () => {
    if (!user || !form) return;

    try {
      setSaving(true);
      await setDoc(doc(db, "users", user.uid), form, { merge: true });
      setProfile(form);
      setEditMode(false);
    } catch {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  /* -------- States -------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Leaf className="animate-pulse text-stone-400" size={48} />
      </div>
    );
  }

  if (!user || !profile || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        {error || "Not logged in"}
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-stone-50 py-24 px-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-100 flex flex-col md:flex-row overflow-hidden">

        {/* Sidebar */}
        <div className="md:w-1/3 bg-gradient-to-b from-stone-900 to-stone-800 text-white p-12 text-center flex flex-col">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 p-1 mx-auto mb-6">
            <div className="w-full h-full rounded-full bg-stone-800 flex items-center justify-center">
              {user.photoURL ? (
                <img src={user.photoURL} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-4xl font-serif text-amber-500">
                  {profile.fullName[0]?.toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-2xl font-serif">{profile.fullName}</h1>
          <p className="text-stone-400 text-sm mb-8">@{profile.username}</p>

          <button
            onClick={() => signOut(auth)}
            className="mx-auto flex items-center gap-2 px-6 py-2 rounded-full border border-stone-600 hover:border-red-500 hover:text-red-400 transition text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>

          <p className="mt-auto text-xs text-stone-500 pt-10">
            Member since{" "}
            {new Date(
              profile.createdAt?.seconds
                ? profile.createdAt.seconds * 1000
                : profile.createdAt
            ).getFullYear()}
          </p>
        </div>

        {/* Main */}
        <div className="md:w-2/3 p-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif text-stone-800 flex items-center gap-2">
              <Leaf className="text-amber-800" size={24} />
              Profile Details
            </h2>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-amber-600 text-white"
              >
                <Edit3 size={14} /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setForm(profile);
                    setEditMode(false);
                  }}
                  className="px-4 py-2 rounded-full border"
                >
                  <X size={14} />
                </button>
                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="px-4 py-2 rounded-full bg-amber-600 text-white"
                >
                  <Save size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-6">
            <EditableRow icon={<UserIcon size={18} />} label="Full Name" value={form.fullName}
              editMode={editMode} onChange={(value) => setForm({ ...form, fullName: value })} />

            <EditableRow icon={<Mail size={18} />} label="Email" value={form.email} />

            <EditableRow icon={<Phone size={18} />} label="Phone" value={form.phone || ""}
              editMode={editMode} onChange={(value) => setForm({ ...form, phone: value })} />

            <EditableRow icon={<MapPin size={18} />} label="Location" value={form.location || ""}
              editMode={editMode} onChange={(value) => setForm({ ...form, location: value })} />

            <EditableRow icon={<UserIcon size={18} />} label="Bio" value={form.bio || ""}
              textarea editMode={editMode}
              onChange={(value) => setForm({ ...form, bio: value })} />

            <div className="grid grid-cols-2 gap-6">
              <StaticRow icon={<Shield size={18} />} label="Role" value={profile.role} />
              <StaticRow icon={<Calendar size={18} />} label="Joined"
                value={new Date(
                  profile.createdAt?.seconds
                    ? profile.createdAt.seconds * 1000
                    : profile.createdAt
                ).toLocaleDateString()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

/* ================= REUSABLE ================= */

const EditableRow: React.FC<EditableRowProps> = ({
  icon,
  label,
  value,
  editMode = false,
  textarea = false,
  onChange,
}) => (
  <div className="flex gap-4 items-start">
    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-xs uppercase text-stone-500 mb-1">{label}</p>
      {editMode && onChange ? (
        textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full border rounded-xl px-4 py-2"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border rounded-xl px-4 py-2"
          />
        )
      ) : (
        <p className="text-stone-800 font-medium">{value || "—"}</p>
      )}
    </div>
  </div>
);

const StaticRow: React.FC<StaticRowProps> = ({ icon, label, value }) => (
  <div className="flex gap-4 items-center bg-stone-50 p-4 rounded-xl">
    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-xs uppercase text-stone-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);
