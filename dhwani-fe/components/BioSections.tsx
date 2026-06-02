import LotusDivider from "@/components/LotusDivider";
import type { BioSection } from "@/lib/about-bharati";

type BioSectionsProps = {
  sections: BioSection[];
};

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
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.title}-p-${index}`}>{paragraph}</p>
            ))}
            {section.list && (
              <ol className="list-decimal space-y-4 pl-5 marker:font-semibold marker:text-cyan">
                {section.list.map((item, index) => (
                  <li key={`${section.title}-li-${index}`} className="pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            )}
            {section.paragraphsAfterList?.map((paragraph, index) => (
              <p key={`${section.title}-after-${index}`}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
