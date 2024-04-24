// @ts-nocheck

import React from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { simpleSet, watch } from "../utils/shared-utils";
import { toast } from "./ui/use-toast";
import { ISettingsBackground } from "../interfaces";
import { StorageKey } from "../consts";

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
            id: image.id,
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

  const [settingsBackground, setSettingsBackground] =
    React.useState<ISettingsBackground>({
      id: "",
      url: "",
      useDefault: false,
      description: "",
      height: 0,
      width: 0,
      tags: [],
    });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    watch(StorageKey.SETTINGS_BACKGROUND, ({ newValue = [] }) => {
      setSettingsBackground(newValue);
      // update the images with the selected image
      const nextImages = images.map((image) =>
        image.id === newValue.id ? { ...image, isSelected: true } : image
      );
      setImages(nextImages);
    });
  }, []);

  async function updateSettingsBackground() {
    if (!settingsBackground.useDefault) {
      if (!settingsBackground.url) {
        return toast({
          title: "Background Required",
          description: "Please select a background.",
          variant: "destructive",
        });
      }
    }

    setLoading(true);
    await simpleSet(StorageKey.SETTINGS_BACKGROUND, settingsBackground);
    setLoading(false);
    toast({
      title: "Background Saved",
      description: "Your background has been saved.",
    });
  }

  const handleSelect = (index: number, item: any, event: any) => {
    // TODO: only allow one image to be selected at a time
    const nextImages = images.map((image, i) =>
      i === index ? { ...image, isSelected: !image.isSelected } : image
    );

    // Update the settings background state with the selected image
    const selectedImage = nextImages.find((image) => image.isSelected);
    setSettingsBackground({
      url: selectedImage.src,
      description: selectedImage.caption,
      height: selectedImage.height,
      width: selectedImage.width,
      tags: selectedImage.tags,
    });
    setImages(nextImages);
  };

  console.log(settingsBackground);

  return (
    <div className="space-y-3">
      {!settingsBackground.useDefault && (
        <>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for images"
          />
          <Gallery
            images={images}
            onSelect={handleSelect}
            onClick={handleClick}
          />

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
        </>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          checked={settingsBackground.useDefault}
          onCheckedChange={(e) =>
            setSettingsBackground({
              ...settingsBackground,
              useDefault: !!e.valueOf(),
            })
          }
          id="include"
        />
        <label
          htmlFor="include"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Use default gradiet background
        </label>
      </div>
      <Button onClick={updateSettingsBackground}>Save</Button>
    </div>
  );
};
