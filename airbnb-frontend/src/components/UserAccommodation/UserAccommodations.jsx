import { Link } from "react-router-dom";
import { API_URL } from "../../../public/API_URL";

export const UserAccommodations = ({accommodations}) => {
  return (
    <div className="user-accommodations">
      {accommodations.length > 0 &&
        accommodations.map((accommodation) => {
          return (
            <div className="user-accommodation" key={accommodation._id}>
              <div className="user-accommodation-image-title-address">
                <div className="user-accommodation-image-container">
                  {accommodation.photos.length > 0 && (
                    <img
                      className="user-accommodation-image"
                      src={`${API_URL}/uploads/${accommodation.photos[0]}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="user-accommodation-title">{accommodation.title}</div>
                <div className="user-accommodation-address">
                  {accommodation.address}
                </div>
              </div>
              <Link to={`/account/accommodations/${accommodation._id}`}>
                <button className="edit-user-accommodation">
                  Edit Accommodation
                </button>
              </Link>
            </div>
          );
        })}
    </div>
  );
};
