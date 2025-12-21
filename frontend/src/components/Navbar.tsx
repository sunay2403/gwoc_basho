import logo from "../assets/logo.jpg";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="
  bg-white
  sticky top-0 z-50
  h-20
  flex items-center
  px-12
  text-[#C85428]
">
  <NavLink to="/home" className="flex items-center">
    <img src={logo} className="h-16" />
  </NavLink>

  <div className="
    ml-auto
    flex
    gap-10
    text-sm
    font-medium
    tracking-wide
    uppercase
    whitespace-nowrap
  ">
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/products">Products</NavLink>
    <NavLink to="/workshops">Workshops</NavLink>
    <NavLink to="/experiences">Experience</NavLink>
    <NavLink to="/studio">Studio</NavLink>
    <NavLink to="/media">Media</NavLink>
    <NavLink to="/corporate">Corporate</NavLink>
  </div>
</nav>

  );
};

export default Navbar;
