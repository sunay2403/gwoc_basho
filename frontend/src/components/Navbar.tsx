import logo from "../assets/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../api/firebase";
import { signOut } from "firebase/auth";

interface AuthUser {
  email: string;
  full_name: string;
  role: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  // -----------------------------
  // Check JWT auth state
  // -----------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  // -----------------------------
  // Logout
  // -----------------------------
  const handleLogout = async () => {
    // Clear JWT auth
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Optional: sign out from Firebase (Google users)
    try {
      await signOut(auth);
    } catch {
      // ignore if not logged in with Firebase
    }

    navigate("/login");
  };

  return (
    <nav
      className="
        bg-white/90 backdrop-blur-md
        sticky top-0 z-50 h-20
        flex items-center px-12
        border-b border-stone-200
        text-[#C85428]
      "
    >
      {/* Logo */}
      <NavLink to="/home" className="flex items-center">
        <img src={logo} className="h-16" alt="Logo" />
      </NavLink>

      {/* Navigation Links */}
      <div
        className="
          ml-auto flex gap-10
          text-sm font-medium tracking-widest uppercase
          whitespace-nowrap
        "
      >
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/workshops">Workshops</NavLink>
        <NavLink to="/experiences">Experience</NavLink>
        <NavLink to="/studio">Studio</NavLink>
        <NavLink to="/media">Media</NavLink>
        <NavLink to="/corporate">Corporate</NavLink>
      </div>

      {/* Auth / Profile */}
      <div className="ml-12 flex items-center gap-6">
        {!user ? (
          <>
            {/* Login */}
            <NavLink
              to="/login"
              className="
                relative text-sm uppercase tracking-widest
                text-[#C85428]/80
                after:absolute after:left-0 after:-bottom-1
                after:h-px after:w-0 after:bg-[#C85428]
                after:transition-all after:duration-300
                hover:after:w-full hover:text-[#C85428]
              "
            >
              Login
            </NavLink>

            {/* Sign Up */}
            <NavLink
              to="/signup"
              className="
                px-6 py-2.5 rounded-full
                bg-linear-to-br from-[#C85428] to-[#b54822]
                text-white text-sm uppercase tracking-widest
                shadow-md shadow-[#C85428]/30
                hover:shadow-lg hover:shadow-[#C85428]/40
                hover:-translate-y-[1px]
                transition-all duration-300
              "
            >
              Sign Up
            </NavLink>
          </>
        ) : (
          <div className="relative group">
            {/* Profile Avatar */}
            <button
              className="
                flex items-center justify-center
                w-10 h-10 rounded-full
                bg-[#C85428]/10
                text-[#C85428]
                text-sm font-medium uppercase
                hover:bg-[#C85428]/20
                transition-all duration-300
              "
              title="Profile"
            >
              {user.email?.[0]?.toUpperCase()}
            </button>

            {/* Dropdown */}
            <div
              className="
                absolute right-0 mt-2 w-40
                bg-white rounded-xl shadow-lg
                border border-stone-200
                opacity-0 scale-95
                group-hover:opacity-100 group-hover:scale-100
                transition-all duration-200
                overflow-hidden
              "
            >
              <NavLink
                to="/profile"
                className="block px-4 py-3 text-sm hover:bg-stone-100"
              >
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm hover:bg-stone-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
