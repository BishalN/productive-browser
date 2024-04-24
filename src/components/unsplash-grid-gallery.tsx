// @ts-nocheck

import React from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import { Input } from "./ui/input";

export const UnsplashGridGallery = () => {
  const [search, setSearch] = React.useState("inspiration");
  const [images, setImages] = React.useState([]);

  const [index, setIndex] = React.useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number, item: any) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  const handleSelect = (index: number, item: any, event: any) => {
    const nextImages = images.map((image, i) =>
      i === index ? { ...image, isSelected: !image.isSelected } : image
    );
    setImages(nextImages);
  };

  //TODO: debounce the search

  React.useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${search}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data.results[0], null, 2));
        setImages(
          data.results.map((image) => ({
            src: image.urls.regular,
            thumbnail: image.urls.thumb,
            thumbnailWidth: image.width,
            thumbnailHeight: image.height,
            isSelected: false,
            caption: image.description,
            tags: image.tags,
            width: image.width,
            height: image.height,
          }))
        );
      });
  }, [search]);

  return (
    <div className="space-y-3">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for images"
      />
      <Gallery images={images} onSelect={handleSelect} onClick={handleClick} />

      {!!currentImage && (
        /* @ts-ignore */
        <Lightbox
          mainSrc={currentImage.src}
          imageTitle={currentImage.caption}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.src}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.src}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </div>
  );
};
