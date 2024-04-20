import { Button } from "../Button";
import { Perks } from "./Perks";
import { useEffect, useState } from "react";
import { UploadPhotos } from "./UploadPhotos";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/accommodation-form.css";
import { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const AccommodationForm = () => {
  const [perks, setPerks] = useState([]);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photosError,setPhotosError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },[])

  const schema = yup.object().shape({
    title: yup
      .string("Only alphanumeric characters")
      .required("Title is required"),
    address: yup
      .string("Only alphanumeric characters")
      .required("Address is required"),
    description: yup
      .string("Only alphanumeric characters")
      .required("Description is required")
      .min("50", "Atleast 50 words"),
    extraInfo: yup
      .string("Only alphanumeric characters")
      .required("Extra Info is required")
      .min("50", "Atleast 50 words"),
    checkIn: yup.string().required("Check in timing is required"),
    checkOut: yup.string().required("Check out timing is required"),
    guestsInfo: yup
      .number("Only numeric value")
      .min(1,"Max Guests should be atleast 1")
      .required("Max Guests is required"),
    price: yup
      .number("Only numeric value")
      .min(1,"Price should be greater than 0")
      .required("Price is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      if (!id) {
        return {
          title: "",
          address: "",
          description: "",
          extraInfo: "",
          checkIn: "",
          checkOut: "",
          guestsInfo: 1,
          price: 50,
        };
      }

      const res = await axios.get(`/accommodations/${id}`);
      const accommodationData = res.data;
      const formValues = {
        title: accommodationData?.title,
        address: accommodationData?.address,
        description: accommodationData?.description,
        extraInfo: accommodationData?.extraInfo,
        checkIn: accommodationData?.checkIn,
        checkOut: accommodationData?.checkOut,
        guestsInfo: accommodationData?.guestsInfo,
        price: accommodationData?.price,
      };
      setAddedPhotos(accommodationData?.photos);
      setPerks(accommodationData?.perks);
      return formValues;
    },
  });

  const addOrEditAccommodation = async (data) => {
    if(addedPhotos.length < 3){
      setPhotosError(true);
      return;
    }
    const accommodationData = {
      title: data.title,
      address: data.address,
      photos: addedPhotos,
      description: data.description,
      perks: perks,
      extraInfo: data.extraInfo,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guestsInfo: data.guestsInfo,
      price: data.price,
    };

    setPhotosError(false);
    id
      ? await axios.put("/user-accommodations", { ...accommodationData, id })
      : await axios.post("/user-accommodations", accommodationData);
    navigate("/account/accommodations");
  };
  
  return (
    <div className="accommodation-form-container">
      <Toaster position="top-right" reverseOrder={true} />
      <form
        onSubmit={handleSubmit(addOrEditAccommodation)}
        className="new-accommodation-form"
      >
        <h2 className="accommodation-form-h2">Title*</h2>
        <p className="sub-label">Title for your place</p>
        <input
          type="text"
          placeholder="title, for example: My Apartment"
          {...register("title")}
        />
        {errors?.title ? (
          <p className="form-error">{errors.title.message}</p>
        ) : (
          ""
        )}

        <h2 className="accommodation-form-h2">Address*</h2>
        <p className="sub-label">Address for this place</p>
        <input type="text" placeholder="address" {...register("address")} />
        {errors?.address ? (
          <p className="form-error">{errors.address.message}</p>
        ) : (
          ""
        )}

        <h2 className="accommodation-form-h2">Photos*</h2>
        <p className="sub-label">more = better (Atleast 3)</p>
        {photosError && <p className="form-error">Upload Atleast 3 photos</p>}
        <UploadPhotos
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        <h2 className="accommodation-form-h2">Description*</h2>
        <p className="sub-label">Description of the place</p>
        <textarea {...register("description")} />
        {errors?.description ? (
          <p className="form-error">{errors.description.message}</p>
        ) : (
          ""
        )}

        <h2 className="accommodation-form-h2">Perks</h2>
        <p className="sub-label">Select all the perks of your place</p>
        <Perks selected={perks} onChange={setPerks} />

        <h2 className="accommodation-form-h2">Extra info*</h2>
        <p className="sub-label">house rules, etc.</p>
        <textarea {...register("extraInfo")} />
        {errors?.extraInfo ? (
          <p className="form-error">{errors.extraInfo.message}</p>
        ) : (
          ""
        )}

        <h2 className="accommodation-form-h2">Check In & Out Times</h2>
        <p className="sub-label">Add check in and out times</p>
        <div className="check-in-out">
          <div>
            <h3>Check in time*</h3>
            <input type="text" placeholder="14:00" {...register("checkIn")} />
            {errors?.checkIn ? (
              <p className="form-error">{errors.checkIn.message}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <h3>Check out time*</h3>
            <input type="text" placeholder="8:00" {...register("checkOut")} />
            {errors?.checkOut ? (
              <p className="form-error">{errors.checkOut.message}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <h3>Max Guests*</h3>
            <input type="number" placeholder="4" {...register("guestsInfo")} />
            {errors?.guestsInfo ? (
              <p className="form-error">{errors.guestsInfo.message}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <h3>Price in USD (Per Night)*</h3>
            <input type="number" placeholder="50" {...register("price")} />
            {errors?.price ? (
              <p className="form-error">{errors.price.message}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <Button id="save" text="Save" />
      </form>
    </div>
  );
};
