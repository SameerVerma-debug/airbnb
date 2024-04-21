import { useRef, useState } from "react";
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AddedPhotos } from "./AddedPhotos";
import { toast } from "react-hot-toast";
export const UploadPhotos = ({ addedPhotos, setAddedPhotos }) => {
  const photoLinkRef = useRef(null);
  const [photo,setPhoto] = useState("");
  const addPhotoByLink = async () => {
    let res;
    try {
      res = await axios.post("/upload-by-link", {
        link: photoLinkRef.current?.value,
      });
      setAddedPhotos((prev) => {
        return [...prev, res.data];
      });
    } catch (err) {
      toast.error("Image Not uploaded",{duration:1500});
    } finally {
      photoLinkRef.current.value = "";
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPhoto(reader.result);
    }
  }

  const uploadPhoto = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    previewFile(file);
    try{
      const res = await axios.post("/upload",{
        photo:photo
      });
      console.log(res.data);
      setAddedPhotos([...addedPhotos,res.data]);
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <>
      <div className="add-with-link">
        <input
          ref={photoLinkRef}
          type="text"
          placeholder="Add using a link ...jpg"
        />
        <button
          onClick={addPhotoByLink}
          type="button"
          className="add-photo-with-link"
        >
          Add Photo
        </button>
      </div>
      <div className="uploadbutton-photos">
        <label className="upload-photo">
          <input
            onChange={(e) => uploadPhoto(e)}
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg, image/jfif, image/webp"
          />
          <IoCloudUploadOutline />
          Upload
        </label>
        <AddedPhotos
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
      </div>
    </>
  );
};
