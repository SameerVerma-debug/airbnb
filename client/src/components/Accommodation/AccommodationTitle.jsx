import { useContext } from "react";
import { AccommodationContext } from "../../pages/Accommodation";

export const AccommodationTitle = () => {
  const { accommodation } = useContext(AccommodationContext);
  return (
    <div className="accommodation-title-address">
      <h1>{accommodation.title}</h1>
      <a
        className="accommodation-location"
        target="_blank"
        href={`https://maps.google.com/?q=${accommodation.address}`}
      >
        {accommodation.address}
      </a>
    </div>
  );
};
