import logo from "../assets/logo.jpg";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../api/firebase";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-50 h-20 transition-all duration-300
        flex items-center justify-between px-6 md:px-12
        border-b
        ${isMenuOpen
          ? 'bg-[#2a2420] border-[#2a2420] text-[#f5f3ef]'
          : 'bg-white/90 backdrop-blur-md border-stone-200 text-[#C85428]'
        }
      `}
    >
      {/* Logo */}
      <NavLink to="/home" className="flex items-center">
        <img src={logo} className="h-12 md:h-16 rounded-sm" alt="Basho Logo" />
      </NavLink>

      {/* Mobile Menu Button */}
      <button
        className={`md:hidden p-2 transition-colors ${isMenuOpen ? 'text-[#f5f3ef]' : 'text-[#C85428]'}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation Links */}
      <div
        className="
          hidden md:flex ml-auto gap-8 lg:gap-10
          text-sm font-medium tracking-widest uppercase
          whitespace-nowrap
        "
      >
        <NavLink to="/home" className={({ isActive }) => isActive ? "text-amber-800 font-bold" : "hover:text-amber-700 transition-colors"}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "text-amber-800 font-bold" : "hover:text-amber-700 transition-colors"}>Products</NavLink>
        <NavLink to="/workshops" className={({ isActive }) => isActive ? "text-amber-800 font-bold" : "hover:text-amber-700 transition-colors"}>Workshops</NavLink>
        <NavLink to="/experiences" className={({ isActive }) => isActive ? "text-amber-800 font-bold" : "hover:text-amber-700 transition-colors"}>Experience</NavLink>
        <NavLink to="/studio" className={({ isActive }) => isActive ? "text-amber-800 font-bold" : "hover:text-amber-700 transition-colors"}>Studio</NavLink>
        <NavLink to="/media" className={({ isActive }) => isActive ? "text-amber-800 font-bold" : "hover:text-amber-700 transition-colors"}>Media</NavLink>
        <NavLink to="/corporate" className={({ isActive }) => isActive ? "text-amber-800 font-bold" : "hover:text-amber-700 transition-colors"}>Corporate</NavLink>
      </div>

      {/* Auth / Profile (Desktop) */}
      <div className="hidden md:flex ml-8 items-center gap-6">
        {!user ? (
          <>
            <NavLink
              to="/login"
              className="
                relative text-sm uppercase tracking-widest
                text-[#C85428]/80
                hover:text-[#C85428] transition-colors
              "
            >
              Login
            </NavLink>

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
          <NavLink
            to="/profile"
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
          </NavLink>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-[#2a2420] flex flex-col items-center justify-start pt-12 space-y-6 animate-fade-in md:hidden h-[calc(100vh-80px)]">

          <div className="flex flex-col items-center gap-6 text-center overflow-y-auto w-full pb-10">
            <NavLink
              to="/home"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `text-3xl font-serif hover:text-amber-500 transition-colors ${isActive ? 'text-amber-500 italic' : 'text-[#f5f3ef]'}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `text-3xl font-serif hover:text-amber-500 transition-colors ${isActive ? 'text-amber-500 italic' : 'text-[#f5f3ef]'}`}
            >
              Products
            </NavLink>
            <NavLink
              to="/workshops"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `text-3xl font-serif hover:text-amber-500 transition-colors ${isActive ? 'text-amber-500 italic' : 'text-[#f5f3ef]'}`}
            >
              Workshops
            </NavLink>
            <NavLink
              to="/experiences"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `text-3xl font-serif hover:text-amber-500 transition-colors ${isActive ? 'text-amber-500 italic' : 'text-[#f5f3ef]'}`}
            >
              Experience
            </NavLink>
            <NavLink
              to="/studio"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `text-3xl font-serif hover:text-amber-500 transition-colors ${isActive ? 'text-amber-500 italic' : 'text-[#f5f3ef]'}`}
            >
              Studio
            </NavLink>
            <NavLink
              to="/media"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `text-3xl font-serif hover:text-amber-500 transition-colors ${isActive ? 'text-amber-500 italic' : 'text-[#f5f3ef]'}`}
            >
              Media
            </NavLink>
            <NavLink
              to="/corporate"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `text-3xl font-serif hover:text-amber-500 transition-colors ${isActive ? 'text-amber-500 italic' : 'text-[#f5f3ef]'}`}
            >
              Corporate
            </NavLink>

            <div className="w-12 h-px bg-white/20 my-2"></div>

            {!user ? (
              <div className="flex flex-col gap-6">
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="text-xl uppercase tracking-widest text-[#f5f3ef]/80 hover:text-white">Login</NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-8 py-3 rounded-full bg-amber-700 text-white text-lg uppercase tracking-widest shadow-xl border border-amber-600/50"
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-xl uppercase tracking-widest text-[#f5f3ef]/80 hover:text-white">
                <span>My Profile</span>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-amber-500">{user.email?.[0]?.toUpperCase()}</div>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
