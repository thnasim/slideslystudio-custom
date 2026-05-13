import { groq } from 'next-sanity';

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    publishedAt,
    readingTime,
    "author": author->{name, role, avatar}
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    publishedAt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    publishedAt,
    readingTime,
    body,
    seo,
    "author": author->{name, role, avatar, bio}
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;
