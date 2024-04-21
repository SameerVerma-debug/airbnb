import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import {lazyload, accessibility, responsive, placeholder} from '@cloudinary/react';

export const AccommodationPhoto = ({photo}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'do1i24kpl'
    }
  }); 

  const myImage = cld.image(photo);
  myImage.resize(thumbnail
    ().width(200).height(200));
  return (
    <div className='advanced-image-container'>
    <AdvancedImage cldImg={myImage} plugins={[ responsive(), lazyload()]}/>
    </div>
  )
}