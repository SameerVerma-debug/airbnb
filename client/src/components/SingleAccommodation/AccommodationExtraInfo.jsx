import { useContext } from "react";
import { AccommodationContext } from "../../pages/SingleAccommodation";

export const AccommodationExtraInfo = () => {
  const { accommodation } = useContext(AccommodationContext);
  return (
    <div className="accommodation-extra-info">
      <h2>Extra Info:</h2>
      <p>{accommodation.extraInfo}</p>
    </div>
  );
};
