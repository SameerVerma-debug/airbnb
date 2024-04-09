import { Link } from "react-router-dom";

export const UserAccommodations = ({accommodations}) => {
  return (
    <div className="accommodations">
      {accommodations.length > 0 &&
        accommodations.map((accommodation) => {
          return (
            <div className="accommodation" key={accommodation._id}>
              <div className="accommodation-image-title-address">
                <div className="accommodation-image-container">
                  {accommodation.photos.length > 0 && (
                    <img
                      className="accommodation-image"
                      src={`http://localhost:4000/uploads/${accommodation.photos[0]}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="accommodation-title">{accommodation.title}</div>
                <div className="accommodation-address">
                  {accommodation.address}
                </div>
              </div>
              <Link to={`/account/accommodations/${accommodation._id}`}>
                <button className="edit-accommodation">
                  Edit Accommodation
                </button>
              </Link>
            </div>
          );
        })}
    </div>
  );
};
