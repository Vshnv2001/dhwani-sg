import { getYouTubeVideoId } from "@/lib/media-types";

type YouTubeEmbedProps = {
  youtubeUrl: string;
  title: string;
  fillParent?: boolean;
};

export default function YouTubeEmbed({ youtubeUrl, title, fillParent = false }: YouTubeEmbedProps) {
  const videoId = getYouTubeVideoId(youtubeUrl);

  return (
    <div
      className={
        fillParent
          ? "relative h-full w-full overflow-hidden rounded-lg"
          : "relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md ring-1 ring-cyan/20"
      }
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
