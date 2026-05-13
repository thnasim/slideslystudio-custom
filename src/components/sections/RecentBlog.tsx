import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { recentPostsQuery } from '@/sanity/lib/queries';
import { formatDate, categoryLabel } from '@/lib/utils';

type RecentPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  publishedAt: string;
};

export default async function RecentBlog() {
  let posts: RecentPost[] = [];
  try {
    posts = await client.fetch<RecentPost[]>(recentPostsQuery);
  } catch {
    posts = [];
  }

  if (!posts.length) return null;

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="pill mb-6">Recent Blog</p>
            <h2 className="font-display text-display-md max-w-2xl">
              Ideas, strategies, <br />
              <span className="italic text-accent">and stories worth reading.</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-ghost self-start md:self-end">
            All articles <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-ink-100 bg-ink-50 p-6 transition-colors hover:border-accent/40"
            >
              <div className="aspect-[5/4] rounded-xl bg-gradient-to-br from-accent/30 via-accent-soft/10 to-ink-100 mb-5" />
              {post.category && (
                <p className="text-xs uppercase tracking-widest text-accent mb-2">
                  {categoryLabel(post.category)}
                </p>
              )}
              <h3 className="font-display text-xl leading-snug mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              <p className="text-xs text-muted">{formatDate(post.publishedAt)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
