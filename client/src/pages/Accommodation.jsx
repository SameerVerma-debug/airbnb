import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "../styles/accommodation.css";
import { createContext, useState } from "react";
import { AllAccommodationPhotos } from "../components/Accommodation/AllAccommodationPhotos";
import { BookingForm } from "../components/Accommodation/BookingForm";
import { AccommodationPhotos } from "../components/Accommodation/AccommodationPhotos";
import { AccommodationTitle } from "../components/Accommodation/AccommodationTitle";
import { AccommodationDescription } from "../components/Accommodation/AccommodationDescription";
import { AccommodationExtraInfo } from "../components/Accommodation/AccommodationExtraInfo";
import { Toaster } from "react-hot-toast";

export const AccommodationContext = createContext();

export const Accommodation = () => {
  const { id } = useParams();
  const [seeAllPhotos, setSeeAllPhotos] = useState(false);

  const [accommodation] = useFetch({
    path: `/accommodations/${id}`,
    dependencies: [id],
  });

  if (seeAllPhotos) {
    return (
      <AllAccommodationPhotos
        data={accommodation}
        setDataVisibility={setSeeAllPhotos}
      />
    );
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
