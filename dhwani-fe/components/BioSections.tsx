import LotusDivider from "@/components/LotusDivider";
import type { BioSection } from "@/lib/about-bharati";

type BioSectionsProps = {
  sections: BioSection[];
};

function BulletList({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  const listClass = ordered
    ? "list-decimal space-y-2 pl-5 marker:font-semibold marker:text-cyan"
    : "list-disc space-y-2 pl-5 marker:text-cyan";

  return (
    <Tag className={listClass}>
      {items.map((item, index) => (
        <li key={index} className="pl-1">
          {item}
        </li>
      ))}
    </Tag>
  );
}

function ParagraphText({
  text,
  link,
}: {
  text: string;
  link?: { label: string; url: string };
}) {
  if (!link?.label || !text.includes(link.label)) {
    return <>{text}</>;
  }

  const parts = text.split(link.label);

  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cyan underline decoration-cyan/50 underline-offset-2 transition-colors hover:text-navy"
            >
              {link.label}
            </a>
          )}
        </span>
      ))}
    </>
  );
}

export default function BioSections({ sections }: BioSectionsProps) {
  return (
    <div className="mt-12 space-y-14">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-serif text-2xl font-semibold text-navy md:text-3xl">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="mt-1 text-sm font-medium uppercase tracking-widest text-cyan">
              {section.subtitle}
            </p>
          )}
          <LotusDivider />

          <div className="space-y-5 text-base leading-relaxed text-neutral-800 md:text-lg">
            {section.paragraphs?.map((paragraph, index) => (
              <p key={`${section.title}-p-${index}`}>
                <ParagraphText text={paragraph} link={section.link} />
              </p>
            ))}
            {section.list && <BulletList items={section.list} ordered />}
            {section.paragraphsAfterList?.map((paragraph, index) => (
              <p key={`${section.title}-after-${index}`}>{paragraph}</p>
            ))}

            {section.subsections?.map((subsection) => (
              <div key={subsection.heading} className="space-y-3">
                <h3 className="font-serif text-lg font-semibold text-navy md:text-xl">
                  {subsection.heading}
                </h3>
                {subsection.paragraphs?.map((paragraph, index) => (
                  <p key={`${subsection.heading}-p-${index}`}>{paragraph}</p>
                ))}
                {subsection.list && <BulletList items={subsection.list} />}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
