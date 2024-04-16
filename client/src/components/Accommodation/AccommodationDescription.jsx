import { useContext } from "react";
import { AccommodationContext } from "../../pages/Accommodation";

export const AccommodationDescription = () => {
  const { accommodation } = useContext(AccommodationContext);
  return (
    <div className="accommodation-description-check-in-out">
      <div className="accommodation-description">
        <h2>Description:</h2>
        {accommodation.description}
      </div>
      <div className="accommodation-check-in-out">
        Check-in: {accommodation.checkIn}
        <br />
        Check-out: {accommodation.checkOut}
        <br />
        Max-Guests: {accommodation.guestsInfo}
      </div>
    </div>
  );
};
