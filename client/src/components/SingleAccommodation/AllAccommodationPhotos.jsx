import { IoMdClose } from "react-icons/io";
import { API_URL } from "../../../public/API_URL";

export const AllAccommodationPhotos = ({data,setDataVisibility}) => {
  return (
    <div className="see-all-photos-container">
      <div>
        <div className="see-all-photos-header">
          <h1>{data.title}</h1>
          <button
            onClick={() => setDataVisibility(false)}
            className="close-all-photos"
          >
            <IoMdClose /> Close Photos
          </button>
        </div>
        <div className="all-photos">
          {data?.photos &&
            data.photos.map((photo) => {
              return (
                <div key={photo}>
                  <img
                    className="all-photos-photo"
                    src={`${API_URL}/uploads/${photo}`}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}