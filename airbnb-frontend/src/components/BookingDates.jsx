import { format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";

export const BookingDates = ({ booking }) => {
  return (
    booking && (
      <div className="user-booking-dates">
        <div className="user-booking-date">
          <FaRegCalendarAlt />
          {format(new Date(booking.checkInDate), "dd-MM-yyyy")}
        </div>
        &rarr;
        <div className="user-booking-date">
          <FaRegCalendarAlt />
          {format(new Date(booking.checkOutDate), "dd-MM-yyyy")}
        </div>
      </div>
    )
  );
};
