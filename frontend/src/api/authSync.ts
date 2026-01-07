import type { User } from "firebase/auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export type BackendUser = {
  id: number;
  firebase_uid: string;
  email: string;
  full_name: string;
  role: string;
};

/**
 * Sync Firebase user with Django backend.
 * - Verifies Firebase token on backend
 * - Creates/updates local User row
 * - Returns backend user object
 */
export const syncUserWithBackend = async (
  firebaseUser: User
): Promise<BackendUser> => {
  const idToken = await firebaseUser.getIdToken(true);

  const res = await fetch(`${API_BASE}/api/auth/firebase/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`, // optional but future-safe
    },
    body: JSON.stringify({ idToken }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to sync user with backend");
  }

  return data;
};
