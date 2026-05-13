import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FOOTER_LINKS, SITE } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-100 bg-ink-50">
      {/* Big CTA */}
      <section className="container-x py-24 md:py-32 text-center">
        <p className="pill mb-6">Ready to Present?</p>
        <h2 className="font-display text-display-lg mb-8">
          Let&apos;s build a deck<br />
          <span className="italic text-accent">worth showing up for.</span>
        </h2>
        <p className="mx-auto max-w-xl text-muted mb-10">
          Our design team can have your next deck in your inbox within hours,
          not weeks. Hop on a quick call and tell us what you need.
        </p>
        <Link href="/contact" className="btn-primary text-base">
          Book a Call <ArrowUpRight size={18} />
        </Link>
      </section>

      <div className="border-t border-ink-100">
        <div className="container-x py-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-3xl italic">
              {SITE.name}<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted">
              {SITE.description}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-block text-cream underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            <FooterColumn title="Company" links={FOOTER_LINKS.company} />
            <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
            <FooterColumn title="Socials" links={FOOTER_LINKS.socials} />
          </div>
        </div>

        <div className="container-x flex flex-col gap-2 border-t border-ink-100 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {SITE.name} Studio. All rights reserved.</span>
          <span>Designed and built with care.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-widest text-muted mb-4">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-cream hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
