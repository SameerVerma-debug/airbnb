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
            <div className="accommodation" key={accommodation._id}>
              <div className="accommodation-image-container">
                <img
                className="accommodation-image"
                  src={
                    "http://localhost:4000/uploads/" + accommodation?.photos[0]
                  }
                />
              </div>
              <p className="accommodation-address">{accommodation.address}</p>
              <p className="accommodation-title">{accommodation.title}</p>
              <p className="accommodation-price">
                <span>${accommodation.price}</span> per night
              </p>
            </div>
          );
        })}
        {accommodations &&
        accommodations.map((accommodation) => {
          return (
            <div className="accommodation" key={accommodation._id}>
              <div className="accommodation-image-container">
                <img
                className="accommodation-image"
                  src={
                    "http://localhost:4000/uploads/" + accommodation?.photos[0]
                  }
                />
              </div>
              <p className="accommodation-address">{accommodation.address}</p>
              <p className="accommodation-title">{accommodation.title}</p>
              <p className="accommodation-price">
                <span>${accommodation.price}</span> per night
              </p>
            </div>
          );
        })}
        {accommodations &&
        accommodations.map((accommodation) => {
          return (
            <div className="accommodation" key={accommodation._id}>
              <div className="accommodation-image-container">
                <img
                className="accommodation-image"
                  src={
                    "http://localhost:4000/uploads/" + accommodation?.photos[0]
                  }
                />
              </div>
              <p className="accommodation-address">{accommodation.address}</p>
              <p className="accommodation-title">{accommodation.title}</p>
              <p className="accommodation-price">
                <span>${accommodation.price}</span> per night
              </p>
            </div>
          );
        })}
    </div>
  );
};
