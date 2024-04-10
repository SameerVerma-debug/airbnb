import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import axios from "axios";
import { UserContextProvider } from "./context/userContext";
import { Account } from "./pages/Account";
import { Profile } from "./components/Profile";
import { Bookings } from "./components/Bookings";
import { Accommodations } from "./components/Accommodation/Accommodations";
import { AccommodationForm } from "./components/Accommodation/AccommodationForm";
import { Accommodation } from "./pages/Accommodation";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="account" element={<Account />}>
              <Route path="profile" element={<Profile />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="accommodations" element={<Accommodations />} />
              <Route path="accommodations/new" element={<AccommodationForm />} />
              <Route path="accommodations/:id" element={<AccommodationForm />} />
            </Route>
            <Route path="/accommodation/:id" element={<Accommodation/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
