'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV, SITE } from '@/lib/constants';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-100/40 bg-ink/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-tight">
          <span className="italic">{SITE.name}</span>
          <span className="ml-1 text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="hidden lg:inline-flex btn-primary">
          Book a Call
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-ink">
          <nav className="container-x flex flex-col py-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-lg text-cream"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4 self-start">
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
