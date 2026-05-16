import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { allServicesQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const revalidate = 60;

export const metadata = {
  title: 'Services',
  description: 'Explore our presentation design services.',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceListItem = any;

export default async function ServicesIndexPage() {
  let items: ServiceListItem[] = [];
  try {
    items = await client.fetch<ServiceListItem[]>(allServicesQuery);
  } catch {
    items = [];
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <section className="container-x">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <p className="pill mb-6">What We Do</p>
            <h1 className="font-display text-display-lg">
              Our <span className="italic text-accent">services.</span>
            </h1>
          </div>

          {items.length === 0 ? (
            <p className="text-center text-muted">
              No services yet. Add one in the <Link href="/studio" className="text-accent underline-offset-4 hover:underline">Studio</Link>.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((s) => (
                <Link
                  key={s._id}
                  href={`/services/${s.slug}`}
                  className="group rounded-3xl border border-ink-100 bg-ink-50 p-6 transition-colors hover:border-accent/40"
                >
                  {s.heroImage?.asset && (
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={urlFor(s.heroImage).width(1200).url()}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h2 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors flex items-center justify-between">
                    {s.title}
                    <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  {s.heroSubtitle && (
                    <p className="text-sm text-muted line-clamp-3">{s.heroSubtitle}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
