import { useContext } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { AccommodationContext } from "../../pages/SingleAccommodation";
import { API_URL } from "../../../public/API_URL";

export const AccommodationPhotos = () => {
  const { accommodation, setSeeAllPhotos } = useContext(AccommodationContext);
  return (
    <div className="accommodation-photos-container">
      {accommodation?.photos[0] && (
        <div
          className="accommodation-photo-container"
          onClick={() => setSeeAllPhotos(true)}
        >
          <img
            src={`${API_URL}/uploads/${accommodation.photos[0]}`}
            className="accommodation-photo index-photo"
          />
        </div>
      )}

      <div className="accommodation-photos-container2">
        {accommodation?.photos[1] && (
          <div
            className="accommodation-photo-container"
            onClick={() => setSeeAllPhotos(true)}
          >
            <img
              src={`${API_URL}/uploads/${accommodation.photos[1]}`}
              className="accommodation-photo hide-on-tablet"
            />
          </div>
        )}
        {accommodation?.photos[2] && (
          <div
            className="accommodation-photo-container last-photo-container"
            onClick={() => setSeeAllPhotos(true)}
          >
            <img
              src={`${API_URL}/uploads/${accommodation.photos[2]}`}
              className="accommodation-photo last-photo hide-on-tablet"
            />
          </div>
        )}
      </div>
      <button
        onClick={() => setSeeAllPhotos(true)}
        className="see-all-photos-button"
      >
        <BsFillGridFill />
        See All Photos
      </button>
    </div>
  );
};
