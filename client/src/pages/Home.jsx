import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "../styles/home.css";
export const Home = () => {
  const [accommodations, loading, error] = useFetch({
    path: "/accommodations",
    dependencies: [],
  });
  return (
    <div className="home">
      {accommodations &&
        accommodations.map((accommodation) => {
          return (
            <Link to={`/accommodation/${accommodation._id}`} className="home-accommodation" key={accommodation._id}>
              <div className="home-accommodation-image-container">
                <img
                className="home-accommodation-image"
                  src={
                    "http://localhost:4000/uploads/" + accommodation?.photos[0]
                  }
                />
              </div>
              <p className="home-accommodation-address">{accommodation.address}</p>
              <p className="home-accommodation-title">{accommodation.title}</p>
              <p className="home-accommodation-price">
                <span>${accommodation.price}</span> per night
              </p>
            </Link>
          );
        })}
        
    </div>
  );
};
