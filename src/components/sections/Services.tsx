import { Sparkles, FileStack, RefreshCw, Layers } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: 'Custom Presentation Design',
    body: 'Pitch decks, webinars, business proposals, corporate reports, animated decks — built to impress, engage, and convert.',
    tags: ['Consistent design', 'Engaging visuals', 'Express delivery'],
  },
  {
    icon: RefreshCw,
    title: 'Convert to Slides',
    body: 'Images, videos, PDFs, sketches, docs, InDesign — we convert any source into PowerPoint, Google Slides, Canva, Keynote, or Figma. 100% editable.',
    tags: ['Editable & branded'],
  },
  {
    icon: FileStack,
    title: 'Any File to Template',
    body: 'We turn your reference files into proper slide templates with master layouts and content placeholders, so anyone on your team can rebuild quickly.',
    tags: ['Master slides', 'Placeholders'],
  },
  {
    icon: Layers,
    title: 'Custom Branded Master Slides',
    body: 'Bespoke master slides and themes that let you spin up an on-brand presentation in a click — from any layout in your library.',
    tags: ['Branded template', 'Usage guide'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="pill mb-6">What We Do Best</p>
          <h2 className="font-display text-display-md">
            Presentations that communicate <br />
            <span className="italic text-accent">with clarity and impact.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="card group relative overflow-hidden transition-colors hover:border-accent/30"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                <p className="text-muted leading-relaxed mb-6">{s.body}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink-100 px-3 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="absolute right-6 top-6 font-display text-sm text-muted">
                  0{i + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
