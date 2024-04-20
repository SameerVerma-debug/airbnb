import { TbBrandAirbnb } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaEarthAsia } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useFetchUser } from "../hooks/useFetchUser";
import { Search } from "./Search";
export const Header = () => {
  const { user } = useContext(UserContext);

  !user && useFetchUser({ path: "/profile", dependencies: [] });

  return (
    <div className="header">
      <Link to="/" className="logo">
        <FaEarthAsia size={30} color="rgba(250, 56, 56, 0.958)"/>

        <h2 className="hide-on-tablet">Booking App</h2>
      </Link>

      <Search />

      <Link to={user ? "/account/profile" : "/login"} className="profile">
        <RxHamburgerMenu className="hide-on-mobile" size={18} />
        <FaCircleUser size={25} opacity={0.5} />
        {user && <p className="hide-on-tablet">{user.name}</p>}
      </Link>
    </div>
  );
};
