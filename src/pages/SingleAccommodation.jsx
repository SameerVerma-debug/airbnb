import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "../styles/accommodation.css";
import { createContext, useEffect, useState } from "react";
import { AllAccommodationPhotos } from "../components/SingleAccommodation/AllAccommodationPhotos";
import { BookingForm } from "../components/SingleAccommodation/BookingForm";
import { AccommodationPhotos } from "../components/SingleAccommodation/AccommodationPhotos";
import { AccommodationTitle } from "../components/SingleAccommodation/AccommodationTitle";
import { AccommodationDescription } from "../components/SingleAccommodation/AccommodationDescription";
import { AccommodationExtraInfo } from "../components/SingleAccommodation/AccommodationExtraInfo";
import { Toaster } from "react-hot-toast";
import { Loading } from "../components/Loading";

export const AccommodationContext = createContext();

export const SingleAccommodation = () => {
  const { id } = useParams();
  const [seeAllPhotos, setSeeAllPhotos] = useState(false);

  const [accommodation,loading] = useFetch({
    path: `/accommodations/${id}`,
    dependencies: [id],
  });

  useEffect(() => {
    window.scrollTo({
      x:0,
      y:0,
      behavior:"smooth"
    })
  },[])


  if (seeAllPhotos) {
    return (
      <AllAccommodationPhotos
        data={accommodation}
        setDataVisibility={setSeeAllPhotos}
      />
    );
  }

  if(loading){
    return <Loading/>
  }

  return (
    <>
      {accommodation && (
        <AccommodationContext.Provider
          value={{ accommodation, setSeeAllPhotos }}
        >
          <div className="accommodation-container">
            <Toaster position="top-right" reverseOrder={true}/>
            <div className="accommodation">
              <AccommodationTitle />
              <AccommodationPhotos />

              <div className="accommodation-description-check-in-out-book">
                <AccommodationDescription />
                <BookingForm />
              </div>
              <AccommodationExtraInfo />
            </div>
          </div>
        </AccommodationContext.Provider>
      )}
    </>
  );
};
