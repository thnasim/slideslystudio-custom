'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What services does Slidesly offer?',
    a: 'Presentation design, custom templates (PowerPoint, Google Slides, Canva, Figma, Keynote), file conversion (any file to slides or documents), and document structuring. We handle most business content needs.',
  },
  {
    q: 'How fast can you deliver my project?',
    a: 'Most projects ship within a few hours up to two or three business days. Rush turnarounds are available — let us know your deadline and we will work backward from it.',
  },
  {
    q: 'How much does your service cost?',
    a: 'Pricing starts at $99 per project. The final number depends on scope and complexity. We will give you a clear quote before any work begins.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'Your raw content (docs, drafts, prior decks, brand guidelines if you have them) and a quick brief on the audience and goal. The clearer the input, the sharper the output.',
  },
  {
    q: 'How do I start a project with Slidesly?',
    a: 'Email hello@slidesly.studio or use the contact form. We will reply within a few hours with next steps.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-ink-100 bg-ink-50/40 py-28 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="pill mb-6">FAQ</p>
          <h2 className="font-display text-display-md">
            Got questions?<br />
            <span className="italic text-accent">We&apos;ve got answers.</span>
          </h2>
          <p className="mt-6 text-muted">
            Straight, no-fluff answers to help you feel confident about working with us.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="divide-y divide-ink-100 rounded-3xl border border-ink-100 bg-ink">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-display text-xl">{faq.q}</span>
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ink-100 text-accent">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-muted leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
