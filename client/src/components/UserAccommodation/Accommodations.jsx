import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/user-accommodation.css";
import { useFetch } from "../../hooks/useFetch";
import { UserAccommodations } from "./UserAccommodations";
import { Loading } from "../Loading";
export const Accommodations = () => {

  const [accommodations,loading] = useFetch({path:"/user-accommodations",dependencies:[]});
  
  if(loading){
    return <Loading/>
  }

  return (
    <div className="user-accommodation-page">
      <Link style={{ textDecoration: "none" }} to="/account/accommodations/new">
        <button className="primary" id="add-new-user-accommodation">
          <FaPlus />
          <span >Add New Accommodation</span>
        </button>
      </Link>
      <UserAccommodations accommodations={accommodations}/>
    </div>
  );
};
