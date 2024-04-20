import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaAddressBook } from "react-icons/fa6";
import { FaBuildingColumns } from "react-icons/fa6";
import "../styles/account.css";

export const Account = () => {
  const {user,userFetched} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },[])
  if(!userFetched){
    return <h1>Loading...</h1>
  }

  if(userFetched && !user){
    navigate('/login');
    return;
  }
  return (
    <div className="account">
      <nav className="navbar">
      <NavLink className="navlink" to="/account/profile"><CgProfile/><span>Profile</span></NavLink>
      <NavLink className="navlink" to="/account/bookings"><FaAddressBook/>Bookings</NavLink>
      <NavLink className="navlink" to="/account/accommodations"><FaBuildingColumns/>Accommodations</NavLink>
      </nav>
      <Outlet/>
    </div>
  )
}