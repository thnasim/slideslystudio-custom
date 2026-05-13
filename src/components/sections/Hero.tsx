import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 grain">
      {/* glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />

      <div className="container-x">
        <div className="mx-auto max-w-5xl text-center">
          <span className="pill mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Trusted by 300+ teams
          </span>

          <h1 className="font-display text-display-xl">
            Design slides
            <br />
            <span className="italic text-accent">that</span> stand out.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted">
            We turn rough notes, scattered docs, and last-night ideas into decks
            that pitch, persuade, and close. Fast turnaround, on-brand polish,
            unlimited revisions.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Book a 15-min intro call <ArrowUpRight size={16} />
            </Link>
            <Link href="/projects" className="btn-ghost">
              See our work
            </Link>
          </div>
        </div>

        {/* stats row */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { kpi: '450+', label: 'Decks delivered' },
            { kpi: '5×', label: 'Engagement boost' },
            { kpi: '4.9', label: 'Average rating' },
            { kpi: '8 yrs', label: 'In the industry' },
          ].map((s) => (
            <div key={s.label} className="bg-ink-50 p-8">
              <div className="font-display text-5xl text-cream">{s.kpi}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
