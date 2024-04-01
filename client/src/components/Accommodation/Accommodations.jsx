import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "../../styles/accommodation.css";
import { AddAccommodation } from "./AddAccommodation";
export const Accommodations = () => {
  const { action } = useParams();
  return (
    <div className="accommodation-page">
      {action !== "new" && (
        <>
          <Link
            style={{ textDecoration: "none" }}
            to="/account/accommodations/new"
          >
            <button className="primary" id="add-new-accommodation">
              <FaPlus />
              Add New Accommodation
            </button>
          </Link>
          <div className="accommodations">My Accommodations</div>
        </>
      )}
      {action === "new" && (
        <AddAccommodation/>
      )}
    </div>
  );
};
