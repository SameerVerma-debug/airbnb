import { Link } from "react-router-dom";
import { AdvanceImage } from "./AdvanceImage";

export const Accommodation = ({accommodation}) => {
  return (
    <Link
      to={`/accommodation/${accommodation?._id}`}
      className="home-accommodation"
    >
      <div className="home-accommodation-image-container">
        <AdvanceImage photo={accommodation?.photos[0]}/>
      </div>
      
      <p className="home-accommodation-address">{accommodation?.address}</p>
      <p className="home-accommodation-title">{accommodation?.title}</p>
      <p className="home-accommodation-price">
        <span>${accommodation?.price}</span> per night
      </p>
    </Link>
  );
};
