interface SectionHeaderProps {
  number: string;
  title: string;
  id?: string;
  href?: string;
}

export function SectionHeader({ number, title, id, href }: SectionHeaderProps) {
  return (
    <header id={id} className="scroll-mt-8">
      <span className="text-lg tracking-widest text-accent-green/40 block mb-1">{number}</span>
      <h2 className="text-white text-2xl md:text-3xl font-semibold">{title}</h2>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-green-400 no-underline hover:text-green-300 transition-colors duration-200 mt-1 inline-block"
        >
          learn more →
        </a>
      )}
    </header>
  );
}
