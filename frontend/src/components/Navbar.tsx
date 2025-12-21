import logo from "../assets/logo.jpg";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="
      bg-white
      sticky
      top-0
      z-50
      h-24
      flex
      items-center
      px-8
      text-[#C85428]
    ">
      <NavLink to="/home" className="flex items-center">
        <img src={logo} alt="logo" className="h-24" />
      </NavLink>

      <div className="ml-auto flex gap-16 text-xl font-[Montserrat] font-medium">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8" : ""
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/workshops"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8" : ""
          }
        >
          Workshops
        </NavLink>

        <NavLink
          to="/experiences"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8" : ""
          }
        >
          Experience
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
