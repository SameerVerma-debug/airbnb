import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "../styles/accommodation.css";
import { BsFillGridFill } from "react-icons/bs";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const Accommodation = () => {
  const { id } = useParams();
  const [seeAllPhotos, setSeeAllPhotos] = useState(false);
  const [accommodation] = useFetch({
    path: `/accommodations/${id}`,
    dependencies: [id],
  });

  if (seeAllPhotos) {
    return (
      <div className="see-all-photos-container">
        <div>
          <div className="see-all-photos-header">
            <h1>{accommodation.title}</h1>
            <button
              onClick={() => setSeeAllPhotos(false)}
              className="close-all-photos"
            >
              <IoMdClose /> Close Photos
            </button>
          </div>
          <div className="all-photos">
            {accommodation?.photos &&
              accommodation.photos.map((photo) => {
                return (
                  <div>
                    <img
                      className="all-photos-photo"
                      src={`http://localhost:4000/uploads/${photo}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {accommodation && (
        <div className="accommodation-container">
          <div className="accommodation">
            <div className="accommodation-title-address">
              <h1>{accommodation.title}</h1>
              <a
                target="_blank"
                href={`https://maps.google.com/?q=${accommodation.address}`}
              >
                {accommodation.address}
              </a>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div className="accommodation-photos-container">
                {accommodation?.photos[0] && (
                  <div className="accommodation-photo-container">
                    <img
                      src={`http://localhost:4000/uploads/${accommodation.photos[0]}`}
                      className="accommodation-photo index-photo"
                    />
                  </div>
                )}

                <div className="accommodation-photos-container2">
                  {accommodation?.photos[1] && (
                    <div className="accommodation-photo-container">
                      <img
                        src={`http://localhost:4000/uploads/${accommodation.photos[1]}`}
                        className="accommodation-photo"
                      />
                    </div>
                  )}
                  {accommodation?.photos[2] && (
                    <div className="accommodation-photo-container last-photo-container">
                      <img
                        src={`http://localhost:4000/uploads/${accommodation.photos[2]}`}
                        className="accommodation-photo last-photo"
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSeeAllPhotos(true)}
                  className="see-all-photos-button"
                >
                  <BsFillGridFill />
                  See All Photos
                </button>
              </div>
            </div>
            <div className="accommodation-description">
              <h2>Description:</h2>
              {accommodation.description}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
