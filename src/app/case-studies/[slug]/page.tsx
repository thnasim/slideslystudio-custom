import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import {
  caseStudyBySlugQuery,
  allCaseStudySlugsQuery,
} from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(allCaseStudySlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cs = await client.fetch<any>(caseStudyBySlugQuery, { slug });
    if (!cs) return { title: 'Case Study not found' };
    return { title: cs.title, description: cs.about };
  } catch {
    return { title: 'Case Study' };
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cs: any = null;

  try {
    cs = await client.fetch(caseStudyBySlugQuery, { slug });
  } catch {
    notFound();
  }

  if (!cs) notFound();

  return (
    <>
      <Header />
      <main>
        {/* 1. HERO — background + logo + big title */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
          {cs.heroBackground?.asset && (
            <Image
              src={urlFor(cs.heroBackground).width(2000).url()}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover -z-10"
            />
          )}
          <div className="absolute inset-0 bg-cream/60 -z-10" />
          <div className="container-x text-center relative">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-cream mb-10 transition-colors"
            >
              <ArrowLeft size={14} /> All case studies
            </Link>
            {cs.logo?.asset && (
              <div className="relative w-32 h-16 mx-auto mb-8">
                <Image
                  src={urlFor(cs.logo).height(120).url()}
                  alt={`${cs.title} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h1 className="font-display text-display-xl">{cs.title}</h1>
          </div>
        </section>

        {/* 2. ABOUT + SIDEBAR */}
        <section className="container-x py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="pill mb-6">About the project</p>
              <p className="text-xl md:text-2xl leading-relaxed text-cream/90">
                {cs.about}
              </p>
            </div>
            <aside className="lg:col-span-4">
              <div className="rounded-3xl border border-ink-100 bg-ink-50 p-8 space-y-6">
                {cs.industry && <SidebarItem label="Industry" value={cs.industry} />}
                {cs.projectType && <SidebarItem label="Project Type" value={cs.projectType} />}
                {cs.services?.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted mb-2">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {cs.services.map((s: string) => (
                        <span
                          key={s}
                          className="rounded-full border border-ink-100 px-3 py-1 text-xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {cs.duration && <SidebarItem label="Duration" value={cs.duration} />}
              </div>
            </aside>
          </div>
        </section>

        {/* 3. FULL-WIDTH FEATURE IMAGE */}
        {cs.featureImage?.asset && (
          <section className="container-x pb-20">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
              <Image
                src={urlFor(cs.featureImage).width(2000).url()}
                alt={cs.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </section>
        )}

        {/* 4. PROCESS — 3 STEPS */}
        {cs.processSteps?.length > 0 && (
          <section className="container-x py-20 md:py-28">
            <div className="text-center mb-16">
              <p className="pill mb-6">The Process</p>
              <h2 className="font-display text-display-md">How we got there.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {cs.processSteps.map((step: any, i: number) => (
                <div
                  key={i}
                  className="rounded-3xl border border-ink-100 bg-ink-50 p-6"
                >
                  {step.image?.asset && (
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={urlFor(step.image).width(800).url()}
                        alt={step.title || ''}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="font-display text-accent text-lg italic mb-2">0{i + 1}</p>
                  <h3 className="font-display text-2xl mb-3">{step.title}</h3>
                  <p className="text-muted leading-relaxed text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. VIDEO LOOP + 2 IMAGES BELOW */}
        {cs.videoUrl && (
          <section className="container-x pb-20">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-ink-50 mb-6">
              <video
                src={cs.videoUrl}
                poster={cs.videoThumbnail?.asset ? urlFor(cs.videoThumbnail).width(2000).url() : undefined}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            {cs.belowVideoImages?.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {cs.belowVideoImages.map((img: any, i: number) => (
                  <div key={i} className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                    {img.asset && (
                      <Image
                        src={urlFor(img).width(1200).url()}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 6. RESULTS — STATS + TIMELINE */}
        {(cs.stats?.length > 0 || cs.timeline) && (
          <section className="container-x py-20 md:py-28">
            <div className="text-center mb-16">
              <p className="pill mb-6">{cs.resultsHeading || 'The Results'}</p>
              <h2 className="font-display text-display-md">
                Numbers that <span className="italic text-accent">matter.</span>
              </h2>
              {cs.timeline && (
                <p className="text-muted mt-4">{cs.timeline}</p>
              )}
            </div>
            {cs.stats?.length > 0 && (
              <div className="grid gap-px overflow-hidden rounded-3xl border border-ink-100 bg-ink-100 md:grid-cols-3">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {cs.stats.map((stat: any, i: number) => (
                  <div key={i} className="bg-ink-50 p-10 text-center">
                    <div className="font-display text-6xl md:text-7xl text-cream mb-3">
                      {stat.number}
                    </div>
                    <div className="text-sm uppercase tracking-widest text-muted">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 7. TESTIMONIAL */}
        {cs.testimonial?.quote && (
          <section className="container-x pb-20 md:pb-28">
            <div className="mx-auto max-w-3xl rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-ink-50 p-10 md:p-14 text-center">
              <div className="flex gap-0.5 text-accent justify-center mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <blockquote className="font-display text-2xl md:text-3xl italic leading-relaxed mb-8">
                &ldquo;{cs.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                {cs.testimonial.avatar?.asset && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(cs.testimonial.avatar).width(120).url()}
                      alt={cs.testimonial.author || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-left">
                  <p className="font-medium">{cs.testimonial.author}</p>
                  {cs.testimonial.role && (
                    <p className="text-sm text-muted">{cs.testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 8. RELATED CASE STUDIES */}
        {cs.relatedCaseStudies?.length > 0 && (
          <section className="container-x border-t border-ink-100 py-20 md:py-28">
            <h2 className="font-display text-display-md text-center mb-16">
              More <span className="italic text-accent">case studies.</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {cs.relatedCaseStudies.map((r: any) => (
                <Link
                  key={r._id}
                  href={`/case-studies/${r.slug}`}
                  className="group rounded-3xl border border-ink-100 bg-ink-50 p-6 transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[5/4] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-accent/30 via-accent-soft/10 to-ink-100">
                    {r.heroBackground?.asset && (
                      <Image
                        src={urlFor(r.heroBackground).width(800).url()}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  {r.industry && (
                    <p className="text-xs uppercase tracking-widest text-accent mb-2">
                      {r.industry}
                    </p>
                  )}
                  <h3 className="font-display text-xl group-hover:text-accent transition-colors">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 9. BIG CTA */}
        <section className="container-x py-24 md:py-32 text-center">
          <h2 className="font-display text-display-lg mb-8">
            {cs.ctaHeading || (
              <>Let&apos;s build <span className="italic text-accent">yours next.</span></>
            )}
          </h2>
          <Link
            href={cs.ctaButtonUrl || '/contact'}
            className="btn-primary text-base"
          >
            {cs.ctaButtonLabel || 'Book a Call'} <ArrowUpRight size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SidebarItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted mb-1">{label}</p>
      <p className="text-cream">{value}</p>
    </div>
  );
}
