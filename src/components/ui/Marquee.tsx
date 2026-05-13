export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-ink-100 py-6">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl italic text-cream/70"
          >
            {item} <span className="text-accent">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
