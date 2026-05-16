import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { allCaseStudiesQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const revalidate = 60;

export const metadata = {
  title: 'Case Studies — Selected Work',
  description: 'In-depth case studies on recent projecåts.',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CaseStudyListItem = any;

export default async function CaseStudiesIndexPage() {
  let items: CaseStudyListItem[] = [];
  try {
    items = await client.fetch<CaseStudyListItem[]>(allCaseStudiesQuery);
  } catch {
    items = [];
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <section className="container-x">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <p className="pill mb-6">Selected Work</p>
            <h1 className="font-display text-display-lg">
              Case <span className="italic text-accent">studies.</span>
            </h1>
            <p className="mt-6 text-muted">
              A closer look at how we partner with teams to ship work that
              moves the needle.
            </p>
          </div>

          {items.length === 0 ? (
            <p className="text-center text-muted">
              No case studies yet. Add one in the <Link href="/studio" className="text-accent underline-offset-4 hover:underline">Studio</Link>.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((cs) => (
                <Link
                  key={cs._id}
                  href={`/case-studies/${cs.slug}`}
                  className="group rounded-3xl border border-ink-100 bg-ink-50 p-6 transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-accent/30 via-accent-soft/10 to-ink-100">
                    {cs.heroBackground?.asset && (
                      <Image
                        src={urlFor(cs.heroBackground).width(1200).url()}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    )}
                    {cs.logo?.asset && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="relative w-32 h-16">
                          <Image
                            src={urlFor(cs.logo).height(120).url()}
                            alt={`${cs.title} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {cs.industry && (
                    <p className="text-xs uppercase tracking-widest text-accent mb-2">
                      {cs.industry}
                    </p>
                  )}
                  <h2 className="font-display text-2xl mb-2 group-hover:text-accent transition-colors">
                    {cs.title}
                  </h2>
                  {cs.projectType && (
                    <p className="text-sm text-muted">{cs.projectType}</p>
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
