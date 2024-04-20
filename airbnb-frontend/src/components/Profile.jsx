import { useContext } from "react"
import { UserContext } from "../context/userContext"
import "../styles/profile.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Toaster,toast} from "react-hot-toast"

export const Profile = () => {
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post('/logout');
      setUser(null);
      alert("Logout Successful")
      navigate('/');
    }catch(err){
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