import { useContext } from "react"
import { UserContext } from "../context/userContext"
import "../styles/profile.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";

export const Profile = () => {
  const {user,setUser,setUserFetched} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post('/logout');
      localStorage.removeItem('token');
      setUser(null);
      setUserFetched(true);
      toast.success("Logout Successful",{
        duration:1000
      })
      navigate('/');
    }catch(err){
      console.log(err);
      toast.error("Logout Unsuccessful",{
        duration:1000
      });
    }
  }

  return (
    <div className="profile-page account-subpage">
      <p>{`Logged in as ${user?.name}`}</p>
      <button className="primary" onClick={handleLogout} id="logout-button">Logout</button>
    </div>
  )
}