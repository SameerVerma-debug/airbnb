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
import { AccommodationForm } from "./components/UserAccommodation/AccommodationForm";
import { SingleAccommodation } from "./pages/SingleAccommodation";
import { SearchResults } from "./components/SearchResults";
import {Error} from "./pages/Error"
import { API_URL } from "../public/API_URL";
import { UserAccommodationPage } from "./components/UserAccommodation/UserAccommodationPage";

axios.defaults.baseURL = API_URL;
axios.defaults.headers['authorization'] = localStorage.getItem('token');
axios.defaults.withCredentials = true;
function App() {
  console.log(localStorage.getItem('token'))
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="account" element={<Account />}>
              <Route path="profile" element={<Profile />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="accommodations" element={<UserAccommodationPage />} />
              <Route path="accommodations/new" element={<AccommodationForm />} />
              <Route path="accommodations/:id" element={<AccommodationForm />} />
            </Route>
            <Route path="/accommodation/:id" element={<SingleAccommodation/>}/>
            <Route path="search/:searchQuery" element={<SearchResults/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
