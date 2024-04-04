import { useRef, useState } from "react";
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const UploadPhotos = ({addedPhotos,setAddedPhotos}) => {
  const photoLinkRef = useRef(null);
  

  const addPhotoByLink = async () => {
    let res;
    try {
      res = await axios.post("/upload-by-link", {
        link: photoLinkRef.current.value,
      });
      setAddedPhotos((prev) => {
        return [...prev, res.data];
      });
    } catch (err) {
      toast("Image not uploaded");
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
    try{
      const res = await axios.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAddedPhotos((prev) => {
        return [...prev, ...res.data];
      });
    }
    catch(err){
      toast("Image not Uploaded!");
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
        <div className="form-photos-container">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => {
              return (
                <img
                  key={link}
                  className="form-photo"
                  src={"http://localhost:4000/uploads/" + link}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
