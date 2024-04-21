import { useContext } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { AccommodationContext } from "../../pages/SingleAccommodation";
import { AdvanceImage } from "../AdvanceImage";

export const AccommodationPhotos = () => {
  const { accommodation, setSeeAllPhotos } = useContext(AccommodationContext);
  return (
    <div className="accommodation-photos-container">
      {accommodation?.photos[0] && (
        <div
          className="accommodation-photo-container"
          onClick={() => setSeeAllPhotos(true)}
        >
          <AdvanceImage photo={accommodation.photos[0]}/>
        </div>
      )}

      <div className="accommodation-photos-container2">
        {accommodation?.photos[1] && (
          <div
            className="accommodation-photo-container"
            onClick={() => setSeeAllPhotos(true)}
          >
            <AdvanceImage photo={accommodation.photos[1]}/>
          </div>
        )}
        {accommodation?.photos[2] && (
          <div
            className="accommodation-photo-container last-photo-container"
            onClick={() => setSeeAllPhotos(true)}
          >
            <AdvanceImage photo={accommodation.photos[2]}/>
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
