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
        <h3>Check-in: {accommodation.checkIn}</h3>
        <br />
        <h3>Check-out: {accommodation.checkOut}</h3>
        <br />
        <h3>Max-Guests: {accommodation.guestsInfo}</h3>
      </div>
    </div>
  );
};
