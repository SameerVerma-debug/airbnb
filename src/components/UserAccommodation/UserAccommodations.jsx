import { Link } from "react-router-dom";
import { API_URL } from "../../../public/API_URL";
import { AccommodationPhoto } from "../AccommodationPhoto";

export const UserAccommodations = ({accommodations}) => {
  return (
    <div className="user-accommodations">
      {accommodations?.length > 0 &&
        accommodations.map((accommodation) => {
          return (
            <div className="user-accommodation" key={accommodation._id}>
              <div className="user-accommodation-image-title-address">
                <div className="user-accommodation-image-container">
                  {accommodation.photos.length > 0 && (
                    <AccommodationPhoto photo={accommodation.photos[0]}/>
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
