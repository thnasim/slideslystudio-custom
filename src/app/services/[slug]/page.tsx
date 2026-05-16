import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { client } from '@/sanity/lib/client';
import {
  serviceBySlugQuery,
  allServiceSlugsQuery,
} from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceFAQ from './ServiceFAQ';
import ServiceIndustries from './ServiceIndustries';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(allServiceSlugsQuery);
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
    const s = await client.fetch<any>(serviceBySlugQuery, { slug });
    if (!s) return { title: 'Service not found' };
    return { title: s.title, description: s.heroSubtitle };
  } catch {
    return { title: 'Service' };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getIcon(name?: string): any {
  if (!name) return LucideIcons.Sparkles;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as any;
  const key =
    name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return icons[key] || LucideIcons.Sparkles;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let s: any = null;
  try {
    s = await client.fetch(serviceBySlugQuery, { slug });
  } catch {
    notFound();
  }
  if (!s) notFound();

  return (
    <>
      <Header />
      <main>
        {/* 1. HERO */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="font-display text-display-xl">{s.title}</h1>
              {s.heroSubtitle && (
                <p className="mt-8 text-lg md:text-xl text-muted max-w-xl">
                  {s.heroSubtitle}
                </p>
              )}
              {s.heroButtonLabel && (
                <Link href={s.heroButtonUrl || '/contact'} className="btn-primary mt-10">
                  {s.heroButtonLabel} <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
            {s.heroImage?.asset && (
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src={urlFor(s.heroImage).width(1200).url()}
                  alt={s.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* 2. TRUSTED BY — moving logos */}
        {s.trustedByLogos?.length > 0 && (
          <section className="border-y border-ink-100 py-10 overflow-hidden">
            <p className="text-center text-xs uppercase tracking-widest text-muted mb-6">
              {s.trustedByHeading || 'Trusted by 150+ clients'}
            </p>
            <div className="flex gap-12 animate-marquee items-center">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {[...s.trustedByLogos, ...s.trustedByLogos].map((logo: any, i: number) => (
                <div key={i} className="relative h-10 w-32 flex-shrink-0 opacity-60 grayscale">
                  {logo.asset && (
                    <Image
                      src={urlFor(logo).height(80).url()}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. WHY THIS SERVICE */}
        {(s.whyTitle || s.whyImage?.asset) && (
          <section className="container-x py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {s.whyImage?.asset && (
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image
                    src={urlFor(s.whyImage).width(1200).url()}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                {s.whyTitle && <h2 className="font-display text-display-md mb-6">{s.whyTitle}</h2>}
                {s.whySubtitle && <p className="text-lg text-muted mb-8">{s.whySubtitle}</p>}
                {s.whyButtonLabel && (
                  <Link href={s.whyButtonUrl || '/contact'} className="btn-primary">
                    {s.whyButtonLabel} <ArrowUpRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 4. PROCESS — 5 STEPS */}
        {s.processSteps?.length > 0 && (
          <section className="border-y border-ink-100 bg-ink-50/40 py-20 md:py-28">
            <div className="container-x">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                {s.processHeading && (
                  <h2 className="font-display text-display-md">{s.processHeading}</h2>
                )}
                {s.processSubheading && (
                  <p className="mt-6 text-muted">{s.processSubheading}</p>
                )}
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {s.processSteps.map((step: any, i: number) => (
                  <div key={i} className="rounded-2xl border border-ink-100 bg-ink p-5">
                    {step.image?.asset && (
                      <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                        <Image
                          src={urlFor(step.image).width(400).url()}
                          alt={step.title || ''}
                          fill
                          sizes="20vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <p className="font-display text-accent italic mb-2">0{i + 1}</p>
                    <h3 className="font-display text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{step.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. INDUSTRIES — accordion left, image right */}
        {s.industries?.length > 0 && (
          <section className="container-x py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div>
                {s.industriesHeading && (
                  <h2 className="font-display text-display-md mb-10">{s.industriesHeading}</h2>
                )}
                <ServiceIndustries industries={s.industries} />
              </div>
              {s.industriesImage?.asset && (
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden lg:sticky lg:top-24">
                  <Image
                    src={urlFor(s.industriesImage).width(1200).url()}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* 6. WHY WE'RE DIFFERENT — title/sub/button left, 6 boxes right */}
        {s.differentBoxes?.length > 0 && (
          <section className="border-y border-ink-100 bg-ink-50/40 py-20 md:py-28">
            <div className="container-x grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                {s.differentHeading && (
                  <h2 className="font-display text-display-md mb-6">{s.differentHeading}</h2>
                )}
                {s.differentSubheading && (
                  <p className="text-muted mb-8">{s.differentSubheading}</p>
                )}
                {s.differentButtonLabel && (
                  <Link href={s.differentButtonUrl || '/contact'} className="btn-primary">
                    {s.differentButtonLabel} <ArrowUpRight size={16} />
                  </Link>
                )}
              </div>
              <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {s.differentBoxes.map((box: any, i: number) => {
                  const Icon = getIcon(box.icon);
                  return (
                    <div key={i} className="rounded-2xl border border-ink-100 bg-ink p-6">
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display text-lg mb-2">{box.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{box.subtitle}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 7. WHY CHOOSE US — image left, content + tags right */}
        {(s.chooseUsTitle || s.chooseUsImage?.asset) && (
          <section className="container-x py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {s.chooseUsImage?.asset && (
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image
                    src={urlFor(s.chooseUsImage).width(1200).url()}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                {s.chooseUsTitle && (
                  <h2 className="font-display text-display-md mb-6">{s.chooseUsTitle}</h2>
                )}
                {s.chooseUsSubtitle && (
                  <p className="text-muted mb-8">{s.chooseUsSubtitle}</p>
                )}
                {s.chooseUsButtonLabel && (
                  <Link
                    href={s.chooseUsButtonUrl || '/contact'}
                    className="btn-primary mb-10"
                  >
                    {s.chooseUsButtonLabel} <ArrowUpRight size={16} />
                  </Link>
                )}
                {s.chooseUsTags?.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-10">
                    {s.chooseUsTags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink-100 bg-ink-50 px-5 py-2 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 8. DATA SECTION — title/sub/button + 3 percentage boxes */}
        {s.dataStats?.length > 0 && (
          <section className="border-y border-ink-100 bg-ink-50/40 py-20 md:py-28">
            <div className="container-x">
              <div className="text-center max-w-3xl mx-auto mb-16">
                {s.dataTitle && (
                  <h2 className="font-display text-display-md">{s.dataTitle}</h2>
                )}
                {s.dataSubtitle && (
                  <p className="mt-6 text-muted">{s.dataSubtitle}</p>
                )}
                {s.dataButtonLabel && (
                  <Link href={s.dataButtonUrl || '/contact'} className="btn-primary mt-8">
                    {s.dataButtonLabel} <ArrowUpRight size={16} />
                  </Link>
                )}
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {s.dataStats.map((stat: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-ink p-10 text-center"
                  >
                    <div className="font-display text-6xl md:text-7xl text-accent mb-3">
                      {stat.percentage}
                    </div>
                    <p className="text-cream">{stat.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 9. TESTIMONIAL */}
        {s.testimonial?.quote && (
          <section className="container-x py-20 md:py-28">
            <div className="mx-auto max-w-3xl rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-ink-50 p-10 md:p-14 text-center">
              <div className="flex gap-0.5 text-accent justify-center mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <blockquote className="font-display text-2xl md:text-3xl italic leading-relaxed mb-8">
                &ldquo;{s.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                {s.testimonial.avatar?.asset && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(s.testimonial.avatar).width(120).url()}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-left">
                  <p className="font-medium">{s.testimonial.author}</p>
                  {s.testimonial.role && (
                    <p className="text-sm text-muted">{s.testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 10. FAQ */}
        {s.faqs?.length > 0 && (
          <section className="border-t border-ink-100 bg-ink-50/40 py-20 md:py-28">
            <div className="container-x">
              <h2 className="font-display text-display-md text-center mb-16">
                {s.faqHeading || 'Frequently asked questions'}
              </h2>
              <div className="max-w-3xl mx-auto">
                <ServiceFAQ faqs={s.faqs} />
              </div>
            </div>
          </section>
        )}

        {/* 11. CONTACT / CUSTOM CTA */}
        <section className="container-x py-24 md:py-32 text-center">
          {s.contactHeading && (
            <h2 className="font-display text-display-lg mb-6">
              {s.contactHeading}
            </h2>
          )}
          {s.contactSubheading && (
            <p className="mx-auto max-w-xl text-muted mb-10">
              {s.contactSubheading}
            </p>
          )}
          <Link href={s.contactButtonUrl || '/contact'} className="btn-primary text-base">
            {s.contactButtonLabel || 'Start a Project'} <ArrowUpRight size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
