type MediaFrameProps = {
  children: React.ReactNode;
};

export default function MediaFrame({ children }: MediaFrameProps) {
  return (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-neutral-900">
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
