import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "../styles/accommodation.css";
import { BsFillGridFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { AllAccommodationPhotos } from "../components/AllAccommodationPhotos";
import axios from "axios";

export const Accommodation = () => {
  const { id } = useParams();
  const [seeAllPhotos, setSeeAllPhotos] = useState(false);
  const checkInDateRef = useRef(null);
  const checkOutDateRef = useRef(null);
  const guestsRef = useRef(null);
  const [accommodation] = useFetch({
    path: `/accommodations/${id}`,
    dependencies: [id],
  });

  if (seeAllPhotos) {
    return (
      <AllAccommodationPhotos
        data={accommodation}
        setDataVisibility={setSeeAllPhotos}
      />
    );
  }

  const validateBooking = (checkInDate,checkOutDate,noOfGuests,currDate) => {
    if(!noOfGuests || noOfGuests > accommodation.guestsInfo){
      return false;
    }

    if(checkInDate < currDate || checkInDate >= checkOutDate){
      return false;
    }
    return true;
  }

  const handleBookAccommodation = async () => {
    const checkInDate = new Date(checkInDateRef.current.value);
    const checkOutDate = new Date(checkOutDateRef.current.value);
    const noOfGuests = guestsRef.current.value;
    const currDate = new Date();

    if(validateBooking(checkInDate,checkOutDate,noOfGuests,currDate)){
      const data = {
        checkInDate,
        checkOutDate,
        noOfGuests
      }
      
      try{
        await axios.post(`/bookings/${accommodation._id}`,data);
      }
      catch(err){
        console.log(err);
      }
    }
  }

  return (
    <>
      {accommodation && (
        <div className="accommodation-container">
          <div className="accommodation">
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

            <div className="accommodation-photos-container">
              {accommodation?.photos[0] && (
                <div className="accommodation-photo-container" onClick={() => setSeeAllPhotos(true)}>
                  <img
                    src={`http://localhost:4000/uploads/${accommodation.photos[0]}`}
                    className="accommodation-photo index-photo"
                  />
                </div>
              )}

              <div className="accommodation-photos-container2">
                {accommodation?.photos[1] && (
                  <div className="accommodation-photo-container" onClick={() => setSeeAllPhotos(true)}>
                    <img
                      src={`http://localhost:4000/uploads/${accommodation.photos[1]}`}
                      className="accommodation-photo"
                    />
                  </div>
                )}
                {accommodation?.photos[2] && (
                  <div className="accommodation-photo-container last-photo-container" onClick={() => setSeeAllPhotos(true)}>
                    <img
                      src={`http://localhost:4000/uploads/${accommodation.photos[2]}`}
                      className="accommodation-photo last-photo"
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
            <div className="accommodation-description-check-in-out-book">
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
              <div className="accommodation-book-container">
                <div className="accommodation-book">
                  <div className="accommodation-book-price">
                    <h2>Price: ${accommodation.price} / night</h2>
                  </div>
                  <div className="accommodation-book-dates">
                    <div className="book-check-in-out">
                      <div className="book-check-in accommodation-book-date">
                        <label>Check In:</label>
                        <input ref={checkInDateRef} className="book-input" type="date" />
                      </div>
                      <div className="accommodation-book-date">
                        <label>Check Out:</label>
                        <input ref={checkOutDateRef} className="book-input" type="date" />
                      </div>
                    </div>
                    <div className="accommodation-book-date">
                      <label>No of Guests:</label>
                      <input ref={guestsRef} type="number" />
                    </div>
                  </div>
                  <button onClick={handleBookAccommodation} className="book-button primary">Book</button>
                </div>
              </div>
            </div>

            <div className="accommodation-extra-info">
              <h2>Extra Info:</h2>
              <p>{accommodation.extraInfo}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
