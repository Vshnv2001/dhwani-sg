type CurriculumListProps = {
  items: string[];
  columns?: 1 | 2;
};

export default function CurriculumList({ items, columns = 2 }: CurriculumListProps) {
  return (
    <ul
      className={`grid gap-3 ${columns === 2 ? "md:grid-cols-2 md:gap-x-10" : ""}`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-800">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
