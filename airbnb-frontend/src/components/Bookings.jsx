import { useFetch } from "../hooks/useFetch";
import "../styles/booking.css";
import { useRef, useState } from "react";
import { Booking } from "./Booking";
import { BookingDates } from "./BookingDates";
import axios from "axios";
import {Toaster,toast} from "react-hot-toast"
import { NoBookings } from "./NoBookings";
import { Loading } from "./Loading";

export const Bookings = () => {
  const cancelBookingModalRef = useRef(null);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [userBookings,loading,setUserBookings] = useFetch({
    path: "/bookings",
    dependencies: [],
  });

  const confirmCancelBooking = (booking) => {
    cancelBookingModalRef.current.showModal();
    setBookingToCancel(booking);
  };

  const dontCancelBooking = () => {
    cancelBookingModalRef.current.close();
  };

  const cancelBooking = async() => {
    const bookingId = bookingToCancel?.id;
    try{
      const res = await axios.delete("/bookings",{
        data:{
          bookingId
        }
      })
      const newUserBookings = userBookings.filter((userBooking) => {
        return userBooking._id !== res.data;
      })
      setUserBookings(newUserBookings);
    }
    catch(err){
      toast.error("Booking not cancelled",{
        duration:2000
      });
    }
    finally{
      cancelBookingModalRef.current.close();
    }
  }

  if(loading){
    return <Loading/>
  }

  return userBookings?.length > 0 ? 
    <div className="user-bookings-container">
      <Toaster/>
      <dialog className="cancel-booking-modal" ref={cancelBookingModalRef}>
        <h2>Cancel Booking?</h2>
        <p className="cancel-booking-title">{bookingToCancel?.title}</p>
        <div className="cancel-booking-dates">
          <BookingDates booking={bookingToCancel} />
        </div>
        <div className="cancel-booking-buttons">
          <button onClick={dontCancelBooking} className="secondary cancel-booking-button">
            No
          </button>
          <button onClick={cancelBooking} className="primary cancel-booking-button">Yes</button>
        </div>
      </dialog>
      {userBookings?.length > 0 &&
        userBookings.map((booking) => {
          return (
            <Booking
              booking={booking}
              confirmCancel={confirmCancelBooking}
              key={booking._id}
            />
          );
        })}
    </div>
  : <NoBookings/>
};
