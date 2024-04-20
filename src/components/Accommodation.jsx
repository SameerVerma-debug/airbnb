import { Link } from "react-router-dom";
import { API_URL } from "../../public/API_URL";

export const Accommodation = ({accommodation}) => {
  return (
    <Link
      to={`/accommodation/${accommodation._id}`}
      className="home-accommodation"
    >
      <div className="home-accommodation-image-container">
        <img
          className="home-accommodation-image"
          src={`${API_URL}/uploads/${accommodation.photos[0]}`}
        />
      </div>
      <p className="home-accommodation-address">{accommodation.address}</p>
      <p className="home-accommodation-title">{accommodation.title}</p>
      <p className="home-accommodation-price">
        <span>${accommodation.price}</span> per night
      </p>
    </Link>
  );
};
