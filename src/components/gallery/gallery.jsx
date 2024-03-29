"use client";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { motion } from "framer-motion";
import "./gallery.scss";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Gallery = () => {
  function generateImagesArray(num) {
    const images = [];
    for (let i = 1; i <= num; i++) {
      images.push({
        original: `/gallery/img${i}.jpeg`,
      });
    }
    return images;
  }

  return (
    <div className="gallery">
      <div className="titleContainer">
          <h1>
            <b>moments to remember</b>
          </h1>
      </div>
      <div className="image-container">
        <ImageGallery
          items={generateImagesArray(10)}
          showPlayButton={true}
          showFullscreenButton={true}
          slideInterval={4000}
          slideOnThumbnailOver={true}
          showIndex={true}
          autoPlay={true}
        //   onPlay={() => {
        //     alert("slideshow is now playing!");
        //   }}
        />
      </div>
    </div>
  );
};

export default Gallery;
