import { differenceInCalendarDays } from "date-fns";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AccommodationContext } from "../../pages/Accommodation";

export const BookingForm = () => {
  const {accommodation} = useContext(AccommodationContext);
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
      checkInDate < currDate
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
      accommodationId: accommodation._id,
      checkInDate,
      checkOutDate,
      noOfGuests,
    };

    try {
      await axios.post(`/bookings`, data);
    } catch (err) {
      alert("Place is reserved for selected dates");
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
            <div className="accommodation-book-date">
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
              <input ref={guestsRef} type="number" min="1"/>
              {bookingErrors.guest && (
                <p className="form-error">
                  {!guestsRef.current.value
                    ? "Guests cannot be 0 or empty"
                    : `Max Guests: ${accommodation.guestsInfo}`}
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
