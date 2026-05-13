import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';

const projects = [
  {
    tag: 'Figma',
    type: 'Pitch Deck',
    title: 'Little Legends',
    body: 'A bold, character-led pitch deck designed in Figma to grab attention and tell a memorable brand story.',
  },
  {
    tag: 'PowerPoint',
    type: 'Template',
    title: 'Founder of Loyalty',
    body: 'A custom-built PowerPoint template engineered for brand consistency across every team deck.',
  },
  {
    tag: 'Google Slides',
    type: 'Webinar',
    title: 'Naseema McElroy',
    body: 'A polished webinar deck designed to engage, educate, and convert a live online audience.',
  },
  {
    tag: 'Keynote',
    type: 'Company Profile',
    title: 'Northbound Studio',
    body: 'A clean, editorial company profile in Keynote with custom typography and a tightly art-directed flow.',
  },
  {
    tag: 'PowerPoint',
    type: 'Pitch Deck',
    title: 'Lumen Health',
    body: 'A data-heavy investor deck rebuilt around a single narrative arc, with charts redesigned for clarity.',
  },
  {
    tag: 'Canva',
    type: 'Brand Template',
    title: 'Saffron Co.',
    body: 'A reusable brand template system in Canva so the team can spin up on-brand content in minutes.',
  },
];

export const metadata = {
  title: 'Works — Selected Projects',
  description: 'Selected presentation design and template work from the Slidesly studio.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="container-x pb-20">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <p className="pill mb-6">Selected Works</p>
            <h1 className="font-display text-display-lg">
              Recent edits <span className="italic text-accent">in action.</span>
            </h1>
            <p className="mt-6 text-muted">
              From pitch decks to business reports — a glimpse of how we turn raw
              content into presentations that make an impact.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.title}
                className="group rounded-3xl border border-ink-100 bg-ink-50 p-8 transition-colors hover:border-accent/40"
              >
                <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-accent/30 via-accent-soft/10 to-ink-100 mb-6 relative overflow-hidden grain">
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="rounded-full bg-ink/70 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur-sm">
                      {p.tag}
                    </span>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-widest text-muted mb-2">
                  {p.type}
                </p>
                <h2 className="font-display text-3xl mb-3">{p.title}</h2>
                <p className="text-muted leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
