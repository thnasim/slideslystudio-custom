import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type LegalDoc = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

const legalDocs: Record<string, LegalDoc> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    lastUpdated: 'February 2026',
    intro:
      'We respect your privacy and take protecting your information seriously. This page explains what we collect, how we use it, and the choices you have.',
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'Name and email address when you contact us or submit a project brief.',
          'Project files and content you share with us so we can complete the work.',
          'Payment information processed via our payment provider when you pay an invoice.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'To communicate with you about active and future projects.',
          'To deliver the design services you have requested.',
          'To improve our process and the experience of working with us.',
          'To send relevant updates only when you have opted in.',
        ],
      },
      {
        heading: 'Data protection',
        body: [
          'We do not sell or share your personal data with third parties.',
          'Project files are kept confidential and used only for delivering your work.',
          'We delete project files on request, or after the project has wrapped up.',
        ],
      },
      {
        heading: 'NDA on request',
        body: [
          'Some projects involve sensitive content. We are happy to sign a Non-Disclosure Agreement before any work begins — just ask.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can access, update, or delete your personal data at any time.',
          'You can opt out of marketing communications.',
          'You can request a copy of the data we hold about you.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Questions about this policy? Email hello@slidesly.studio and we will get back to you.',
        ],
      },
    ],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    lastUpdated: 'February 2026',
    intro:
      'By using our services, you agree to the terms below. Please read them carefully before submitting a project.',
    sections: [
      {
        heading: 'Services',
        body: [
          'We provide presentation design, custom template creation, file conversion, and document structuring. We deliver work based on the requirements and content you provide.',
        ],
      },
      {
        heading: 'Pricing & payment',
        body: [
          'Services start from $99 per project.',
          'Final pricing depends on scope and complexity.',
          'Payment is due before final delivery.',
          'All prices are in USD unless noted otherwise.',
        ],
      },
      {
        heading: 'Project delivery',
        body: [
          'Most projects are delivered within a few hours up to two or three business days.',
          'Rush turnaround is available on request.',
          'Timelines depend on project complexity and how quickly we can get answers from you.',
        ],
      },
      {
        heading: 'Revisions',
        body: [
          'Each project includes revision rounds so you end up with something you are genuinely happy with.',
          'Revisions should be requested within seven days of delivery.',
          'Major scope changes outside the original brief may require an additional fee.',
        ],
      },
      {
        heading: 'Client responsibilities',
        body: [
          'Provide accurate content and clear requirements.',
          'Respond to questions promptly so the project does not stall.',
          'Make sure you have the rights to any content you share with us.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'On full payment, you own the final deliverables.',
          'We may showcase the work in our portfolio unless you ask us not to.',
          'We do not claim ownership of your content or ideas.',
        ],
      },
      {
        heading: 'Confidentiality',
        body: [
          'All project files and information are treated as confidential.',
          'We do not share your content with third parties.',
          'We are happy to sign an NDA on request.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'We are not liable for indirect, incidental, or consequential damages arising from use of our services. Total liability is capped at the amount you paid for the project.',
        ],
      },
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    lastUpdated: 'February 2026',
    intro:
      'We want you to be satisfied with the work. Here is how refunds work for our services and digital products.',
    sections: [
      {
        heading: 'Templates and digital products',
        body: [
          'Because of the nature of digital downloads, all sales are final by default.',
          'Refunds may still be considered if you accidentally bought the same item twice, hit a technical issue we cannot fix, or if the product is significantly different from what was advertised.',
          'Requests for digital products must be sent within seven days of purchase.',
        ],
      },
      {
        heading: 'Design services',
        body: [
          'Before work begins: full refund.',
          'After work has started: partial refund based on completed work or time invested.',
          'After final delivery: refunds are not available, but we will keep iterating with you on revisions.',
        ],
      },
      {
        heading: 'How to request a refund',
        body: [
          'Email hello@slidesly.studio with your order or invoice number, the reason for the request, and any helpful screenshots or context. We will reply within three business days.',
        ],
      },
      {
        heading: 'Policy updates',
        body: [
          'This policy may be updated from time to time. Changes will be posted on this page along with a refreshed date.',
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(legalDocs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = legalDocs[slug];
  if (!doc) return { title: 'Legal' };
  return { title: doc.title };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = legalDocs[slug];
  if (!doc) notFound();

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <article className="container-x">
          <div className="mx-auto max-w-3xl">
            <p className="pill mb-6">Legal</p>
            <h1 className="font-display text-display-lg mb-4">{doc.title}</h1>
            <p className="text-muted mb-2">Last updated: {doc.lastUpdated}</p>
            <p className="text-cream/90 leading-relaxed text-lg mt-8 mb-12">
              {doc.intro}
            </p>

            <div className="space-y-12">
              {doc.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl md:text-3xl mb-5">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 text-cream/85 leading-[1.8]">
                    {section.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
