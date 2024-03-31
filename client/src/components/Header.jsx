import { TbBrandAirbnb } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
export const Header = () => {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    useEffect(() => {
      let ignore = false;
      if (!ignore) {
        try {
          const fetchUser = async () => {
            const {data} = await axios.get("/profile");
            setUser(data);
          };
          fetchUser();
        } catch (err) {
          console.log(err);
        }
      }

      return () => {
        ignore = true;
      };
    },[]);
  }
  return (
    <div className="header">
      <Link to="/" className="logo">
        <TbBrandAirbnb size={40} color="rgba(250, 56, 56, 0.958)" />
        <p>airbnb</p>
      </Link>

      <div className="search">
        <div className="anywhere">Anywhere</div>
        <div className="anyweek">Any Week</div>
        <div>Add Guests</div>
        <button className="search-button">
          <IoIosSearch size={16} color="white" />
        </button>
      </div>

      <Link to={user ? "/account" : "/login"} className="profile">
        <RxHamburgerMenu size={18} />
        <FaCircleUser size={25} opacity={0.5} />
        {user && <p>{user.name}</p>}
      </Link>
    </div>
  );
};
