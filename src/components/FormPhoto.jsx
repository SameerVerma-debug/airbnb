import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

export const FormPhoto = ({photo}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'do1i24kpl'
    }
  }); 

  const myImage = cld.image(photo);
  myImage.resize(thumbnail
    ().width(150).height(150));
  return (
    <AdvancedImage className='form-image' cldImg={myImage}/>
  )
}