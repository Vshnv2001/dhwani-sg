type LocalVideoProps = {
  src: string;
  title: string;
  fillParent?: boolean;
};

export default function LocalVideo({ src, title, fillParent = false }: LocalVideoProps) {
  return (
    <div
      className={
        fillParent
          ? "relative h-full w-full overflow-hidden rounded-lg bg-neutral-900"
          : "relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 shadow-md ring-1 ring-cyan/20"
      }
    >
      <video
        src={src}
        controls
        preload="none"
        playsInline
        className="h-full w-full object-contain"
        aria-label={title}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
