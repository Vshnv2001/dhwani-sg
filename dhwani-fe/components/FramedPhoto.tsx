import Image from "next/image";

type FramedPhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
};

export default function FramedPhoto({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 92vw, 40rem",
}: FramedPhotoProps) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
      <Image
        src={src}
        alt=""
        fill
        aria-hidden
        className="scale-110 object-cover blur-2xl brightness-90"
        sizes={sizes}
        priority={priority}
      />
      <div className="absolute inset-0 bg-white/20" aria-hidden />
      <Image
        src={src}
        alt={alt}
        fill
        className="relative z-10 object-contain p-3"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
