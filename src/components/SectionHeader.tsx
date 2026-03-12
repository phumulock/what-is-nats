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
      <h2 className="text-white text-2xl md:text-3xl font-semibold">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 no-underline transition-all duration-300 hover:text-green-300"
            style={{ textShadow: "0 0 10px rgba(74, 222, 128, 0.6), 0 0 30px rgba(74, 222, 128, 0.4), 0 0 60px rgba(74, 222, 128, 0.25), 0 0 100px rgba(74, 222, 128, 0.1)" }}
          >
            {title}{" →"}
          </a>
        ) : (
          title
        )}
      </h2>
    </header>
  );
}
