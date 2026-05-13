import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { ArrowLeft } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import {
  postBySlugQuery,
  relatedPostsQuery,
  allPostSlugsQuery,
} from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatDate, categoryLabel } from '@/lib/utils';

export const revalidate = 60;

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage?: any;
  category?: string;
  publishedAt: string;
  readingTime?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  author?: { name: string; role?: string; bio?: string; avatar?: any };
  seo?: { metaTitle?: string; metaDescription?: string };
};

type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
};

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(allPostSlugsQuery);
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
    const post = await client.fetch<Post | null>(postBySlugQuery, { slug });
    if (!post) return { title: 'Post not found' };
    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
    };
  } catch {
    return { title: 'Post' };
  }
}

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-3xl md:text-4xl mt-14 mb-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl md:text-3xl mt-10 mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-xl md:text-2xl mt-8 mb-3">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-cream/90 leading-[1.8] mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-6 my-8 font-display text-2xl italic text-cream/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-cream font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline-offset-4 hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1600).quality(85).url();
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={url}
              alt={value.alt || ''}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-muted text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: Post | null = null;
  let related: RelatedPost[] = [];

  try {
    [post, related] = await Promise.all([
      client.fetch<Post | null>(postBySlugQuery, { slug }),
      client.fetch<RelatedPost[]>(relatedPostsQuery, { slug }),
    ]);
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <article className="container-x">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-cream transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Back to blog
          </Link>

          <header className="mx-auto max-w-3xl text-center mb-12">
            {post.category && (
              <p className="text-xs uppercase tracking-widest text-accent mb-6">
                {categoryLabel(post.category)}
              </p>
            )}
            <h1 className="font-display text-display-lg mb-6">{post.title}</h1>
            <p className="text-muted text-lg mb-8">{post.excerpt}</p>
            <div className="flex items-center justify-center gap-3 text-sm text-muted">
              {post.author?.name && <span>{post.author.name}</span>}
              <span>·</span>
              <time>{formatDate(post.publishedAt)}</time>
              {post.readingTime && (
                <>
                  <span>·</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>
          </header>

          {post.coverImage?.asset && (
            <div className="relative mx-auto mb-16 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl">
              <Image
                src={urlFor(post.coverImage).width(1600).url()}
                alt={post.coverImage.alt || post.title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mx-auto max-w-3xl">
            <PortableText value={post.body} components={portableComponents} />
          </div>
        </article>

        {related.length > 0 && (
          <section className="container-x mt-28 border-t border-ink-100 pt-20">
            <h2 className="font-display text-display-md mb-12 text-center">
              Check more <span className="italic text-accent">blogs.</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r._id}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-ink-100 bg-ink-50 p-6 transition-colors hover:border-accent/40"
                >
                  <h3 className="font-display text-xl leading-snug mb-3 group-hover:text-accent transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2 mb-4">{r.excerpt}</p>
                  <p className="text-xs text-muted">{formatDate(r.publishedAt)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
