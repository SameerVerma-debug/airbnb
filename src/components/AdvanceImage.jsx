import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import {
  lazyload,
  responsive,
} from "@cloudinary/react";

export const AdvanceImage = ({ photo }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "do1i24kpl",
    },
  });

  const myImage = cld.image(photo);
  return (
    <AdvancedImage cldImg={myImage} plugins={[responsive(), lazyload()]} />
  );
};
