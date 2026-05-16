import HeaderClient from './HeaderClient';
import { client } from '@/sanity/lib/client';
import { allServicesQuery, allCaseStudiesQuery } from '@/sanity/lib/queries';

export const revalidate = 60;

export default async function Header() {
  let services: { title: string; slug: string }[] = [];
  let caseStudies: { title: string; slug: string }[] = [];

  try {
    services = await client.fetch(allServicesQuery);
  } catch {}
  try {
    caseStudies = await client.fetch(allCaseStudiesQuery);
  } catch {}

  return <HeaderClient services={services} caseStudies={caseStudies} />;
}
