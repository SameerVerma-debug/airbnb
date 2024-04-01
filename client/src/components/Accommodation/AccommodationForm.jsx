import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from "../Button";
import { Perks } from "./Perks";
import { useRef, useState } from "react";

export const AccommodationForm = () => {
  const titleRef = useRef(null);
  const addressRef = useRef(null);
  const photoLinkRef = useRef(null);
  const descriptionRef = useRef(null);
  const extraInfoRef = useRef(null);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const guestsRef = useRef(null);

  const [addedPhotos,setAddedPhotos] = useState([]);
  const [perks,setPerks] = useState([]);

  return (
    <div className="accommodation-form-container">
      <form className="new-accommodation-form">

        <h2>Title</h2>
        <p className="sub-label">Title for your place</p>
        <input ref={titleRef} type="text" placeholder="title, for example: My Apartment" />

        <h2>Address</h2>
        <p className="sub-label">Address for this place</p>
        <input ref={addressRef} type="text" placeholder="address" />

        <h2>Photos</h2>
        <p className="sub-label">more = better</p>
        <div className="add-with-link">
          <input ref={photoLinkRef} type="text" placeholder="Add using a link ...jpg" />
          <button type="button" className="add-photo-with-link">
            Add Photo
          </button>
        </div>
        <div className="form-photos">
          <button className="upload-photo" type="button">
            <IoCloudUploadOutline />
            Upload
          </button>
        </div>

        <h2>Description</h2>
        <p className="sub-label">Description of the place</p>
        <textarea ref={descriptionRef} />

        <h2>Perks</h2>
        <p className="sub-label">Select all the perks of your place</p>
        <Perks selected={perks} onChange={setPerks}/>

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
        </div>
        <Button id="save" text="Save" />
      </form>
    </div>
  );
};
