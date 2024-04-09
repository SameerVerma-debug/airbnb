import { FaTrash } from "react-icons/fa";

export const AddedPhotos = ({ addedPhotos,setAddedPhotos }) => {
  const handleDeletePhoto = (deletedLink) => {

    const newAddedPhotos = addedPhotos.filter((link) => {
      return link !== deletedLink
    })

    setAddedPhotos(newAddedPhotos);
  }

  return (
    <div className="form-photos-container">
      {addedPhotos.length > 0 &&
        addedPhotos.map((link) => {
          return (
            <div key={link} className="form-photo-container">
              <img
                className="form-photo"
                src={"http://localhost:4000/uploads/" + link}
              />
              <button type="button" className="delete-photo" onClick={() => handleDeletePhoto(link)}>
                <FaTrash />
              </button>
            </div>
          );
        })}
    </div>
  );
};
