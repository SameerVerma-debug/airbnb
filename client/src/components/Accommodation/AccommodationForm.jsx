import { Button } from "../Button";
import { Perks } from "./Perks";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadPhotos } from "./UploadPhotos";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/accommodation-form.css";
import { useFetch } from "../../hooks/useFetch";

export const AccommodationForm = () => {
  const titleRef = useRef(null);
  const addressRef = useRef(null);
  const descriptionRef = useRef(null);
  const extraInfoRef = useRef(null);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const guestsRef = useRef(null);
  const priceRef = useRef(null);

  const [perks, setPerks] = useState([]);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  let accommodationData;
  if(id){
    [accommodationData] = useFetch({
      path: `/user-accommodations/${id}`,
      dependencies: [id],
    });
  }
  
  useEffect(() => {
    if (accommodationData) {
      titleRef.current.value = accommodationData.title;
      addressRef.current.value = accommodationData.address;
      setAddedPhotos(accommodationData.photos);
      descriptionRef.current.value = accommodationData.description;
      setPerks(accommodationData.perks);
      extraInfoRef.current.value = accommodationData.extraInfo;
      checkInRef.current.value = accommodationData.checkIn;
      checkOutRef.current.value = accommodationData.checkOut;
      guestsRef.current.value = accommodationData.guestsInfo;
      priceRef.current.value = accommodationData.price
    }
  }, [accommodationData]);

  const addOrEditAccommodation = async (e) => {
    e.preventDefault();
    const accommodationData = {
      title: titleRef.current.value,
      address: addressRef.current.value,
      photos: addedPhotos,
      description: descriptionRef.current.value,
      perks: perks,
      extraInfo: extraInfoRef.current.value,
      checkIn: checkInRef.current.value,
      checkOut: checkOutRef.current.value,
      guestsInfo: guestsRef.current.value,
      price:priceRef.current.value
    };

    id
      ? await axios.put("/user-accommodations", {...accommodationData,id})
      : await axios.post("/user-accommodations", accommodationData);
    navigate("/account/accommodations");
  };

  return (
    <div className="accommodation-form-container">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        rtl={false}
        pauseOnHover={false}
        theme="dark"
      />
      <form onSubmit={addOrEditAccommodation} className="new-accommodation-form">
        <h2>Title</h2>
        <p className="sub-label">Title for your place</p>
        <input
          ref={titleRef}
          type="text"
          placeholder="title, for example: My Apartment"
        />

        <h2>Address</h2>
        <p className="sub-label">Address for this place</p>
        <input ref={addressRef} type="text" placeholder="address" />

        <h2>Photos</h2>
        <p className="sub-label">more = better</p>
        <UploadPhotos
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        <h2>Description</h2>
        <p className="sub-label">Description of the place</p>
        <textarea ref={descriptionRef} />

        <h2>Perks</h2>
        <p className="sub-label">Select all the perks of your place</p>
        <Perks selected={perks} onChange={setPerks} />

        <h2>Extra info</h2>
        <p className="sub-label">house rules, etc.</p>
        <textarea ref={extraInfoRef} />

        <h2>Check In & Out Times</h2>
        <p className="sub-label">Add check in and out times</p>
        <div className="check-in-out">
          <div>
            <h3>Check in time</h3>
            <input ref={checkInRef} type="text" placeholder="14:00" />
          </div>
          <div>
            <h3>Check out time</h3>
            <input ref={checkOutRef} type="text" placeholder="8:00" />
          </div>
          <div>
            <h3>Max Guests</h3>
            <input ref={guestsRef} type="number" placeholder="4" />
          </div>
          <div>
            <h3>Price in USD (Per Night)</h3>
            <input ref={priceRef} type="number" placeholder="50"/>
          </div>
        </div>
        <Button id="save" text="Save" />
      </form>
    </div>
  );
};
