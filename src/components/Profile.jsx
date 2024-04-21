import { useContext } from "react"
import { UserContext } from "../context/userContext"
import "../styles/profile.css"
import { useNavigate } from "react-router-dom";
import {Toaster,toast} from "react-hot-toast"
import axios from "axios";

export const Profile = () => {
  const {user,setUser,setUserFetched} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post('/logout');
      localStorage.removeItem('token');
      setUser(null);
      setUserFetched(true);
      alert("Logout Successful")
      navigate('/');
    }catch(err){
      console.log(err);
      alert("Logout Unsuccessful");
    }
  }

  return (
    <div className="profile-page account-subpage">
      <Toaster/>
      <p>{`Logged in as ${user?.name}`}</p>
      <button className="primary" onClick={handleLogout} id="logout-button">Logout</button>
    </div>
  )
}