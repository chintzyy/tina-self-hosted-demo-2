'use client'

import { useState } from "react";
import PhotoAlbum, { RenderPhotoProps } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Image from "next/image";

import { Container, Section, Placeholder } from "~/components/util";
import { useTina, tinaField } from "tinacms/dist/react";

function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Image
        fill
        src={photo}
        data-tina-field={tinaField(photo)}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        {...{ alt, title, sizes, className, onClick }}
      />
    </div>
  );
}

const GalleryTiles = (props) => {
  const [index, setIndex] = useState(-1);
  
  const { data } = useTina(props)
  const gallery = data?.page?.blocks
  .find(item => item.__typename === 'PageBlocksImageGallery').gallery
  .find(item => item.slug === props.slug)
  

  if (!gallery?.images) {
    return <Placeholder message="No photos have been added to this gallery. Please add some photos for the component to show." />
  }
  
  const lighboxGallery = gallery.images.map(item => ({ ...item.meta.large }))
  const photoAlbumGallery = gallery.images.map(item => ({ ...item.meta.thumb }))
  console.log({ gallery, lighboxGallery, photoAlbumGallery})

  return (
    <Section>
      <Container
        size="large"
        width="medium"
        data-tina-field={tinaField(gallery, 0)}
      >
        <PhotoAlbum
          layout="masonry"
          renderPhoto={NextJsImage}
          targetRowHeight={150}
          photos={photoAlbumGallery}
          onClick={({ index }) => setIndex(index)}
        />
        <Lightbox
          slides={lighboxGallery}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          // enable optional lightbox plugins
          plugins={[Fullscreen, Slideshow, Thumbnails, Video]}
        />
      </Container>
    </Section>
  )
}

export default GalleryTiles
