import logo from "../assets/logo.jpg";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../api/firebase";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Products", path: "/products" },
    { name: "Workshops", path: "/workshops" },
    { name: "Experience", path: "/experiences" },
    { name: "Studio", path: "/studio" },
    { name: "Media", path: "/media" },
    { name: "Corporate", path: "/corporate" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200">
      <div className="flex items-center h-20 px-6 md:px-12">
        {/* Logo */}
        <NavLink to="/home" className="flex items-center">
          <img src={logo} className="h-14 md:h-16" />
        </NavLink>

        {/* Desktop Links */}
        <div className="ml-auto hidden md:flex gap-10 text-sm font-medium tracking-widest uppercase text-[#C85428]">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="ml-10 hidden md:flex items-center gap-6">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="relative text-sm uppercase tracking-widest text-[#C85428]/80
                  after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0
                  after:bg-[#C85428] after:transition-all hover:after:w-full"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="px-6 py-2.5 rounded-full bg-linear-to-br
                  from-[#C85428] to-[#b54822] text-white text-sm uppercase
                  tracking-widest shadow-md hover:shadow-lg transition-all"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/profile"
              className="w-10 h-10 flex items-center justify-center rounded-full
                bg-[#C85428]/10 text-[#C85428] uppercase"
            >
              {user.email?.[0]?.toUpperCase()}
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="ml-auto md:hidden text-[#C85428]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6 px-6 py-6 text-sm uppercase tracking-widest text-[#C85428]">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink
                to="/signup"
                className="text-center py-3 rounded-full bg-[#C85428] text-white"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <NavLink to="/profile">Profile</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
