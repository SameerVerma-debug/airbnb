import { differenceInCalendarDays, format } from "date-fns";
import { useFetch } from "../hooks/useFetch";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineNightsStay } from "react-icons/md";
import { BsCreditCardFill } from "react-icons/bs";
import "../styles/booking.css";
export const Bookings = () => {
  const [userBookings] = useFetch({
    path: "/bookings",
    dependencies: [],
  });

  return (
    <div className="user-bookings-container">
      {userBookings?.length > 0 &&
        userBookings.map((booking) => {
          return (
            <div className="user-booking">
              {booking.accommodation.photos.length > 0 && (
                <img
                  className="user-booking-photo"
                  src={`http://localhost:4000/uploads/${booking.accommodation.photos[0]}`}
                />
              )}
              <div className="user-booking-info">
                <p className="user-booking-title">{booking.accommodation.title}</p>
                <div className="user-booking-nights-dates">
                  <div className="user-booking-nights-container">
                    <MdOutlineNightsStay/>
                    <p className="user-booking-nights">
                      {differenceInCalendarDays(
                        booking.checkOutDate,
                        booking.checkInDate
                      )}
                      <span> </span>nights
                    </p>
                  </div>
                  <div className="user-booking-dates">
                    <div className="user-booking-date">
                      <FaRegCalendarAlt/>
                      {format(new Date(booking.checkInDate),'dd-MM-yyyy')}
                    </div>
                    &rarr;
                    <div className="user-booking-date">
                      <FaRegCalendarAlt/>
                    {format(new Date(booking.checkOutDate),'dd-MM-yyyy')}
                    </div>
                  </div>
                </div>
                <div className="user-booking-price">
                  <BsCreditCardFill/>
                    <p className="booking-price">Total Price: ${booking.price}</p>
                  </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
