import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatDate, categoryLabel } from '@/lib/utils';

export const revalidate = 60;

type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  publishedAt: string;
  readingTime?: number;
  author?: { name: string; role?: string };
};

export const metadata = {
  title: 'Blog — Insights & Tips',
  description: 'Ideas, strategies, and stories about presentation design.',
};

export default async function BlogIndexPage() {
  let posts: PostListItem[] = [];
  try {
    posts = await client.fetch<PostListItem[]>(allPostsQuery);
  } catch {
    posts = [];
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <section className="container-x">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <p className="pill mb-6">Insights & Tips</p>
            <h1 className="font-display text-display-lg">
              Slidesly <span className="italic text-accent">Insights.</span>
            </h1>
            <p className="mt-6 text-muted">
              Ideas, strategies, and behind-the-scenes notes for teams who want
              decks that stand out — and actually convert.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="mx-auto max-w-md text-center text-muted">
              <p className="mb-4">No posts yet.</p>
              <p className="text-sm">
                Add posts in the <Link href="/studio" className="text-accent underline-offset-4 hover:underline">Sanity Studio</Link>.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-3xl border border-ink-100 bg-ink-50 p-6 transition-colors hover:border-accent/40"
                >
                  <div className="aspect-[5/4] rounded-2xl bg-gradient-to-br from-accent/30 via-accent-soft/10 to-ink-100 mb-6 relative overflow-hidden grain" />
                  <div className="flex items-center gap-3 text-xs text-muted mb-3">
                    {post.category && (
                      <span className="uppercase tracking-widest text-accent">
                        {categoryLabel(post.category)}
                      </span>
                    )}
                    {post.readingTime && <span>· {post.readingTime} min read</span>}
                  </div>
                  <h2 className="font-display text-2xl leading-snug mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted">
                    {post.author?.name && <span>{post.author.name}</span>}
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
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
