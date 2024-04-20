import { IoMdClose } from "react-icons/io";

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