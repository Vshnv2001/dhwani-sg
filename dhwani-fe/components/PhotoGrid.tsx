import FramedPhoto from "@/components/FramedPhoto";
import type { GalleryImage } from "@/lib/gallery";

type PhotoGridProps = {
  images: GalleryImage[];
};

export default function PhotoGrid({ images }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {images.map((image) => (
        <figure key={image.src} className="overflow-hidden rounded-xl shadow-sm ring-1 ring-cyan/20">
          <FramedPhoto src={image.src} alt={image.alt} sizes="(max-width: 640px) 50vw, 25vw" />
        </figure>
      ))}
    </div>
  );
}
