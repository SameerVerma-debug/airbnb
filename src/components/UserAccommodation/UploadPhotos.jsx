import { useRef } from "react";
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AddedPhotos } from "./AddedPhotos";
import { toast } from "react-hot-toast";
export const UploadPhotos = ({ addedPhotos, setAddedPhotos }) => {
  const photoLinkRef = useRef(null);

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

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    try {
      const res = await axios.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAddedPhotos((prev) => {
        return [...prev, ...res.data];
      });
    } catch (err) {
      toast.error("Image Not uploaded",{duration:1500});
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
            onChange={uploadPhoto}
            type="file"
            multiple
            className="hidden"
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
