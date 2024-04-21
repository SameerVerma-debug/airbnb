import { useRef, useState } from "react";
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AddedPhotos } from "./AddedPhotos";
import { toast } from "react-hot-toast";
export const UploadPhotos = ({ addedPhotos, setAddedPhotos }) => {
  const [photo,setPhoto] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPhoto(reader.result);
    }
  }

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    previewFile(file);
    try{
      const res = await axios.post("/upload",{
        photo:photo
      });
      toast.success("Image uploaded",{duration:1500});
      setAddedPhotos([...addedPhotos,res.data]);
    }
    catch(err){
      toast.error("Image Not uploaded",{duration:1500});
    }
  };

  return (
    <>
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
