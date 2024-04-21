import { IoMdClose } from "react-icons/io";
import { AdvanceImage } from "../AdvanceImage";

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
                <div className="all-photos-photo-container" key={photo}>
                  <AdvanceImage photo={photo}/>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}