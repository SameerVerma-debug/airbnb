import { useContext } from "react"
import { UserContext } from "../context/userContext"
import "../styles/profile.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post('/logout');
      setUser(null);
      navigate('/');
    }catch(err){
      alert("Something Went Wrong");
    }
  }

  return (
    <div className="profile-page account-subpage">
      <p>{`Logged in as ${user?.name}`}</p>
      <button onClick={handleLogout} id="logout-button">Logout</button>
    </div>
  )
}