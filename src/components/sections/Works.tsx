import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const works = [
  {
    tag: 'PowerPoint',
    type: 'Template',
    title: 'Founder of Loyalty',
    body: 'A custom-built PowerPoint template designed for repeatable brand consistency across every team deck.',
  },
  {
    tag: 'Google Slides',
    type: 'Webinar',
    title: 'Naseema McElroy',
    body: 'A polished webinar presentation built to engage, educate, and convert a live audience.',
  },
  {
    tag: 'Figma',
    type: 'Pitch Deck',
    title: 'Little Legends',
    body: 'A bold, character-led pitch deck that puts the brand story front and center.',
  },
];

export default function Works() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="pill mb-6">Hall of Fame</p>
            <h2 className="font-display text-display-md max-w-2xl">
              Recent edits <span className="italic text-accent">in action.</span>
            </h2>
          </div>
          <Link href="/projects" className="btn-ghost self-start md:self-end">
            View all works <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {works.map((w) => (
            <article
              key={w.title}
              className="group rounded-3xl border border-ink-100 bg-ink-50 p-6 transition-colors hover:border-accent/40"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent/30 via-accent-soft/10 to-ink-100 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 grain" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="rounded-full bg-ink/70 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur-sm">
                    {w.tag}
                  </span>
                </div>
              </div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">
                {w.type}
              </p>
              <h3 className="font-display text-2xl mb-3">{w.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{w.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
