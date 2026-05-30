import FramedPhoto from "@/components/FramedPhoto";
import LocalVideo from "@/components/LocalVideo";
import MediaFrame from "@/components/MediaFrame";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import type { MediaItem } from "@/lib/media-types";

type MediaSlideProps = {
  item: MediaItem;
  priority?: boolean;
};

export function MediaSlide({ item, priority = false }: MediaSlideProps) {
  if (item.type === "youtube" && item.url) {
    return (
      <MediaFrame>
        <div className="absolute inset-x-3 top-1/2 aspect-video w-[calc(100%-1.5rem)] -translate-y-1/2">
          <YouTubeEmbed youtubeUrl={item.url} title={item.caption} fillParent />
        </div>
      </MediaFrame>
    );
  }

  if (item.type === "video" && item.src) {
    return (
      <MediaFrame>
        <div className="absolute inset-x-3 top-1/2 aspect-video w-[calc(100%-1.5rem)] -translate-y-1/2">
          <LocalVideo src={item.src} title={item.caption} fillParent />
        </div>
      </MediaFrame>
    );
  }

  if (item.type === "photo" && item.src) {
    return <FramedPhoto src={item.src} alt={item.caption} priority={priority} />;
  }

  return null;
}
