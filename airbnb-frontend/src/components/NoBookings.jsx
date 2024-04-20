import { Link } from "react-router-dom"
import { Home } from "../pages/Home"

export const NoBookings = () =>{
  return (
    <div className="no-bookings">
      <h2>No Bookings</h2>
      <Link to="/"><button className="primary explore-places">Explore Places</button></Link>
    </div>
  )
}