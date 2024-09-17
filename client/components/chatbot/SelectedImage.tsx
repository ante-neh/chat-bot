import Image from "next/image";
import { FC, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeImage } from "@/app/GlobalRedux/Features/chat/chatSlice";
import { selectedImageProps } from "@/types/chat";

const SelectedImage: FC<selectedImageProps> = ({ source }) => {
  const [images, setImages] = useState<string[]>([]);
  const isInitialized = useRef(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isInitialized.current) {
      if (Array.isArray(source)) {
        setImages(source.slice(0, 5));
      } else if (typeof source === 'string') {
        setImages([source]);
      }
      isInitialized.current = true;
    }
  }, [source]);

  const handleRemoveImage = (index: number, url:string) => {
    dispatch(removeImage(url))
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveSingleImage = (url:string) => {
    dispatch(removeImage(url))
    setImages([]);
  };

  const displayedImages = Array.isArray(source) ? images.slice(0, 5) : images;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 w-full h-max">
        {
            Array.isArray(displayedImages)? (
                displayedImages.map((image, index) => (
                    <div className="relative h-16 w-16 rounded-lg" key={index}>
                      <Image src={image} layout="fill" alt="selected images" className="object-cover rounded-lg" />
                      {/* <button
                        className="absolute top-0 right-0 z-10 rounded-full bg-white w-4 h-4 grid place-content-center"
                        onClick={() => handleRemoveImage(index, image)}
                      >
                        <Image src="/images/productPage/cancelIcon.svg" width={20} height={20} alt="cancel icon" />
                      </button> */}
                    </div>
                  ))
            ) : <div className="relative h-16 w-16 rounded-lg">
                    <Image src={displayedImages} layout="fill" alt="selected images" className="object-cover rounded-lg" />
                    <button
                    className="absolute top-0 right-0 z-10 rounded-full bg-white w-4 h-4 grid place-content-center"
                    onClick={()=>handleRemoveSingleImage(displayedImages)}
                    >
                    <Image src="/images/productPage/cancelIcon.svg" width={20} height={20} alt="cancel icon" />
                    </button>
                </div>
        }
        
      </div>
      {/* {Array.isArray(displayedImages) && displayedImages.length > 0 && <p>({displayedImages.length} / 4)</p>} */}
    </div>
  );
};

export default SelectedImage;
