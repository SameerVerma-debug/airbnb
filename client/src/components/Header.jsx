import { TbBrandAirbnb } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useFetchUser } from "../hooks/useFetchUser";
export const Header = () => {
  const { user } = useContext(UserContext);

  !user && useFetchUser({ path: "/profile", dependencies: [] });

  return (
    <div className="header">
      <Link to="/" className="logo">
        <TbBrandAirbnb size={40} color="rgba(250, 56, 56, 0.958)" />
        <p className="hide-on-mobile">Booking App</p>
      </Link>

      <div className="search">
        <input className="search-input" type="text" placeholder="Search Location"/>
        <button className="search-button">
          <IoIosSearch size={20} color="white" />
        </button>
      </div>

      <Link to={user ? "/account/profile" : "/login"} className="profile">
        <RxHamburgerMenu size={18} />
        <FaCircleUser size={25} opacity={0.5} />
        {user && <p className="hide-on-mobile">{user.name}</p>}
      </Link>
    </div>
  );
};
