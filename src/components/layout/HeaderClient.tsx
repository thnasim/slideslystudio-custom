'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SITE } from '@/lib/constants';

type NavItem = {
  label: string;
  href: string;
  children?: { title: string; slug: string }[];
};

export default function HeaderClient({
  services,
  caseStudies,
}: {
  services: { title: string; slug: string }[];
  caseStudies: { title: string; slug: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const nav: NavItem[] = [
    {
      label: 'Services',
      href: '/services',
      children: services.map((s) => ({ title: s.title, slug: s.slug })),
    },
    {
      label: 'Case Studies',
      href: '/case-studies',
      children: caseStudies.map((c) => ({ title: c.title, slug: c.slug })),
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-100/40 bg-ink/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-tight">
          <span className="italic">{SITE.name}</span>
          <span className="ml-1 text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-cream"
              >
                {item.label}
                {item.children && item.children.length > 0 && (
                  <ChevronDown size={14} />
                )}
              </Link>

              {item.children && item.children.length > 0 && openDropdown === item.label && (
                <div className="absolute left-0 top-full pt-2 min-w-[240px]">
                  <div className="rounded-2xl border border-ink-100 bg-ink-50 p-2 shadow-xl">
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-ink-100 hover:text-cream"
                    >
                      View all {item.label.toLowerCase()}
                    </Link>
                    <div className="my-1 h-px bg-ink-100" />
                    {item.children.map((child) => (
                      <Link
                        key={child.slug}
                        href={`${item.href}/${child.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm text-cream hover:bg-ink-100 hover:text-accent"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link href="/contact" className="hidden lg:inline-flex btn-primary">
          Book a Call
        </Link>

        <button onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-ink">
          <nav className="container-x flex flex-col py-6">
            {nav.map((item) => (
              <div key={item.label} className="py-2">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg text-cream py-1"
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="ml-4 mt-2 space-y-1 border-l border-ink-100 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.slug}
                        href={`${item.href}/${child.slug}`}
                        onClick={() => setOpen(false)}
                        className="block text-sm text-muted py-1"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
