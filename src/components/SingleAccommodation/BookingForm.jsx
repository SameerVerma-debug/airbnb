import { differenceInCalendarDays } from "date-fns";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AccommodationContext } from "../../pages/SingleAccommodation";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export const BookingForm = () => {
  const { accommodation } = useContext(AccommodationContext);
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [bookingErrors, setBookingErrors] = useState({
    date: false,
    guest: false,
  });
  const checkInDateRef = useRef(null);
  const checkOutDateRef = useRef(null);
  const guestsRef = useRef(null);

  const validateBookingDates = (checkInDate, checkOutDate) => {
    const currDate = new Date();
    if (
      differenceInCalendarDays(checkOutDate, checkInDate) <= 0 ||
      differenceInCalendarDays(checkInDate, currDate) < 0
    ) {
      return false;
    }
    return true;
  };

  const validateBookingGuests = (noOfGuests, maxGuests) => {
    if (!noOfGuests || maxGuests < noOfGuests) {
      return false;
    }
    return true;
  };

  const validateBookingForm = (
    checkInDate,
    checkOutDate,
    noOfGuests,
    maxGuests
  ) => {
    let isBookingValid = true;
    const dateError = !validateBookingDates(checkInDate, checkOutDate);
    const guestError = !validateBookingGuests(noOfGuests, maxGuests);
    if (dateError && guestError) {
      setBookingErrors({
        guest: true,
        date: true,
      });
      isBookingValid = false;
    } else if (dateError) {
      setBookingErrors({
        guest: false,
        date: true,
      });
      isBookingValid = false;
    } else if (guestError) {
      setBookingErrors({
        guest: true,
        date: false,
      });
      isBookingValid = false;
    }

    if (isBookingValid) {
      setBookingErrors({
        date: false,
        guest: false,
      });
    }
    return isBookingValid;
  };

  const handleBookAccommodation = async () => {
    const checkInDate = new Date(checkInDateRef.current.value);
    const checkOutDate = new Date(checkOutDateRef.current.value);
    const noOfGuests = guestsRef.current.value;

    if(!user){
      navigate("/login");
    }

    if (
      !validateBookingForm(
        checkInDate,
        checkOutDate,
        noOfGuests,
        accommodation.guestsInfo
      )
    ) {
      return;
    }

    const data = {
      accommodation: accommodation._id,
      checkInDate,
      checkOutDate,
      noOfGuests,
      price: accommodation.price * numberOfNights,
    };

    try {
      await axios.post(`/bookings`, data);
      toast.success("Booking Confirmed", {
        duration: 1500,
      });
    } catch (err) {
      toast.error("Place Booked for selected dates", {
        duration: 1500,
      });
    }
  };

  const calculateBookingPrice = () => {
    const checkInDate = new Date(checkInDateRef.current.value);
    const checkOutDate = new Date(checkOutDateRef.current.value);

    if (!validateBookingDates(checkInDate, checkOutDate)) {
      setNumberOfNights(0);
      return;
    }

    setNumberOfNights(differenceInCalendarDays(checkOutDate, checkInDate));
  };
  return (
    <div className="accommodation-book-container">
      <div className="accommodation-book">
        <div className="accommodation-book-price">
          <h2>Price: ${accommodation.price} / night</h2>
        </div>
        <div className="accommodation-book-dates">
          <div className="book-check-in-out">
            <div className="book-check-in accommodation-book-date">
              <label>Check In:</label>
              <input
                onChange={calculateBookingPrice}
                ref={checkInDateRef}
                className="book-input"
                type="date"
              />
            </div>
            <div className="book-check-out accommodation-book-date">
              <label>Check Out:</label>
              <input
                onChange={calculateBookingPrice}
                ref={checkOutDateRef}
                className="book-input"
                type="date"
              />
            </div>
          </div>
          <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
            {bookingErrors.date && <p className="form-error">Invalid dates</p>}
            <div className="accommodation-book-date">
              <label>No of Guests:</label>
              <input ref={guestsRef} type="number" min="1" defaultValue="1" />
              {bookingErrors.guest && (
                <p className="form-error">
                  {`Max Guests: ${accommodation.guestsInfo}`}
                </p>
              )}
            </div>
            {numberOfNights > 0 && (
              <p className="accommodation-booking-total">
                {`Total: $${accommodation.price * numberOfNights}`}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleBookAccommodation}
          className="book-button primary"
        >
          Book
        </button>
      </div>
    </div>
  );
};
