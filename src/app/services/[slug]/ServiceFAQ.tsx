'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ServiceFAQ({ faqs }: { faqs: any[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-100 rounded-3xl border border-ink-100 bg-ink">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <span className="font-display text-xl">{faq.question}</span>
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ink-100 text-accent">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            {isOpen && faq.answer && (
              <div className="px-6 pb-6 text-muted leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
