import { FaTrash } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

export const AddedPhotos = ({ addedPhotos,setAddedPhotos }) => {
  const handleDeletePhoto = (deletedLink) => {

    const newAddedPhotos = addedPhotos.filter((link) => {
      return link !== deletedLink
    })

    setAddedPhotos(newAddedPhotos);
  }

  const changeMainPhoto = (photoIndex) => {
    const currMainPhoto = addedPhotos[0];
    addedPhotos[0] = addedPhotos[photoIndex];
    addedPhotos[photoIndex] = currMainPhoto;
    setAddedPhotos([...addedPhotos]);
  }

  return (
    <div className="form-photos-container">
      {addedPhotos.length > 0 &&
        addedPhotos.map((link,index) => {
          return (
            <div key={link} className="form-photo-container">
              <img
                className="form-photo"
                src={"http://localhost:4000/uploads/" + link}
              />
              <button type="button" className="delete-photo" onClick={() => handleDeletePhoto(link)}>
                <FaTrash />
              </button>
              <button onClick={() => changeMainPhoto(index)} type="button" className="main-photo">
                {link === addedPhotos[0] ? <FaStar/> : <FaRegStar/>}
              </button>
            </div>
          );
        })}
    </div>
  );
};
