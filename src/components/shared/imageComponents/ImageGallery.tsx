import React from "react";
import { cn } from '../../../lib/utils';

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className={cn("flex flex-col items-center space-y-4 w-full", className)}>
      
      <div className="w-full">
        <img
          src={images[0]}
          alt="Main"
          className="w-full object-cover rounded-lg h-48 sm:h-56 md:h-64 lg:h-72"
        />
      </div>

     
      <div className="w-full grid grid-cols-2 gap-2 sm:grid-cols-4">
        {images.slice(1).map((img, index) => (
          <div key={index} className="w-full">
            <img
              src={img}
              alt={`Thumb ${index + 1}`}
              className="w-full object-cover rounded-md h-20 sm:h-24"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
