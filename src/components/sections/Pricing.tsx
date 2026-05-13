import Link from 'next/link';
import { Check, ArrowUpRight } from 'lucide-react';

const features = [
  '100% editable, consistent design',
  '24h / 48h / 72h delivery options',
  'Pitch decks, reports, templates and more',
  'Convert from any file to slides',
  'PowerPoint, Google Slides, Canva, Figma',
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative border-y border-ink-100 bg-ink-50/40 py-28 md:py-36">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="pill mb-6">Simple Plan</p>
          <h2 className="font-display text-display-md">
            One plan that fits the way <span className="italic text-accent">you work.</span>
          </h2>
          <p className="mt-6 text-muted max-w-2xl mx-auto">
            Rush job or detailed brand work — both fit. Start with a single project, scale up
            when you&apos;re ready.
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-ink p-10 md:p-14 text-center">
          <p className="text-sm uppercase tracking-widest text-muted mb-4">Starting from</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-display text-7xl md:text-8xl">$99</span>
            <span className="text-muted">/ project</span>
          </div>

          <ul className="mt-10 space-y-4 text-left max-w-md mx-auto">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent flex-shrink-0">
                  <Check size={12} />
                </span>
                <span className="text-cream">{f}</span>
              </li>
            ))}
          </ul>

          <Link href="/contact" className="btn-primary mt-10">
            Book a Call <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
