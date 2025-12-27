import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-500">
        Checking access…
      </div>
    );
  }

  // not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // logged in → allow access
  return <>{children}</>;
};

export default ProtectedRoute;
