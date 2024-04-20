import { differenceInCalendarDays } from "date-fns";
import { BsCreditCardFill } from "react-icons/bs";
import { MdOutlineNightsStay } from "react-icons/md";
import { BookingDates } from "./BookingDates";
import { API_URL } from "../../public/API_URL";

export const Booking = ({ booking, confirmCancel }) => {
  return (
    <div className="user-booking" key={booking._id}>
      {booking.accommodation.photos.length > 0 && (
        <img
          className="user-booking-photo"
          src={`${API_URL}/uploads/${booking.accommodation.photos[0]}`}
        />
      )}
      <div className="user-booking-info">
        <p className="user-booking-title">{booking.accommodation.title}</p>
        <div className="user-booking-nights-dates">
          <div className="user-booking-nights-container">
            <MdOutlineNightsStay />
            <p className="user-booking-nights">
              {differenceInCalendarDays(
                booking.checkOutDate,
                booking.checkInDate
              )}
              <span> </span>nights
            </p>
          </div>
          <BookingDates booking={booking}/>
        </div>
        <div className="user-booking-price">
          <BsCreditCardFill />
          <p className="booking-price">Total Price: ${booking.price}</p>
        </div>
        <button
          onClick={() =>
            confirmCancel({
              id:booking._id,
              title: booking.accommodation.title,
              checkInDate: booking.checkInDate,
              checkOutDate:booking.checkOutDate,
            })
          }
          className="primary user-booking-cancel"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};
