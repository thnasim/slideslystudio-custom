import { groq } from 'next-sanity';

// EXISTING BLOG QUERIES (keep these)
export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, coverImage,
    category, publishedAt, readingTime,
    "author": author->{name, role, avatar}
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...4] {
    _id, title, "slug": slug.current, excerpt, coverImage, category, publishedAt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, excerpt, coverImage,
    category, publishedAt, readingTime, body, seo,
    "author": author->{name, role, avatar, bio}
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
    _id, title, "slug": slug.current, excerpt, publishedAt
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

// CASE STUDY QUERIES
export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, logo, heroBackground,
    industry, projectType, publishedAt
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    relatedCaseStudies[]->{
      _id, title, "slug": slug.current, logo, heroBackground, industry
    }
  }
`;

export const allCaseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)][].slug.current
`;

// SERVICE QUERIES
export const allServicesQuery = groq`
  *[_type == "service" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, heroSubtitle, heroImage, publishedAt
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    ...,
    "slug": slug.current
  }
`;

export const allServiceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)][].slug.current
`;
