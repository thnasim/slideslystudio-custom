import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    // 1. HERO
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroButtonLabel',
      title: 'Hero Button Label',
      type: 'string',
      initialValue: 'Book a Call',
    }),
    defineField({
      name: 'heroButtonUrl',
      title: 'Hero Button URL',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (right side)',
      type: 'image',
      options: { hotspot: true },
    }),

    // 2. TRUSTED BY LOGOS
    defineField({
      name: 'trustedByHeading',
      title: 'Trusted By Heading',
      type: 'string',
      initialValue: 'Trusted by 150+ clients',
    }),
    defineField({
      name: 'trustedByLogos',
      title: 'Client Logos (will scroll)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // 3. WHY THIS SERVICE
    defineField({
      name: 'whyTitle',
      title: 'Why This Service — Title',
      type: 'string',
    }),
    defineField({
      name: 'whySubtitle',
      title: 'Why This Service — Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whyButtonLabel',
      title: 'Why — Button Label',
      type: 'string',
    }),
    defineField({
      name: 'whyButtonUrl',
      title: 'Why — Button URL',
      type: 'string',
    }),
    defineField({
      name: 'whyImage',
      title: 'Why — Image (left side)',
      type: 'image',
      options: { hotspot: true },
    }),

    // 4. PROCESS — 5 STEPS
    defineField({
      name: 'processHeading',
      title: 'Process — Section Heading',
      type: 'string',
      initialValue: 'How we do it',
    }),
    defineField({
      name: 'processSubheading',
      title: 'Process — Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps (5 max)',
      type: 'array',
      validation: (rule) => rule.max(5),
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image', title: 'Step Image', options: { hotspot: true } },
            { name: 'title', type: 'string', title: 'Step Title' },
            { name: 'subtitle', type: 'text', rows: 2, title: 'Step Subtitle' },
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
    }),

    // 5. INDUSTRIES — accordion list with right image
    defineField({
      name: 'industriesHeading',
      title: 'Industries — Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'industriesImage',
      title: 'Industries — Right-Side Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'industries',
      title: 'Industries (clickable accordion)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Industry Name' },
            { name: 'description', type: 'text', rows: 3, title: 'Description (shown when expanded)' },
          ],
          preview: { select: { title: 'name' } },
        },
      ],
    }),

    // 6. WHY WE'RE DIFFERENT — 6 boxes
    defineField({
      name: 'differentHeading',
      title: 'Why We\'re Different — Title',
      type: 'string',
    }),
    defineField({
      name: 'differentSubheading',
      title: 'Why We\'re Different — Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'differentButtonLabel',
      title: 'Different — Button Label',
      type: 'string',
    }),
    defineField({
      name: 'differentButtonUrl',
      title: 'Different — Button URL',
      type: 'string',
    }),
    defineField({
      name: 'differentBoxes',
      title: 'Different — 6 Icon Boxes',
      type: 'array',
      validation: (rule) => rule.max(6),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name (e.g. "sparkles", "zap", "shield", "rocket")',
              initialValue: 'sparkles',
            },
            { name: 'title', type: 'string', title: 'Box Title' },
            { name: 'subtitle', type: 'text', rows: 2, title: 'Box Subtitle' },
          ],
          preview: { select: { title: 'title', subtitle: 'icon' } },
        },
      ],
    }),

    // 7. WHY CHOOSE US — image + content + 8 rounded tags
    defineField({
      name: 'chooseUsImage',
      title: 'Why Choose Us — Left Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'chooseUsTitle',
      title: 'Why Choose Us — Title',
      type: 'string',
    }),
    defineField({
      name: 'chooseUsSubtitle',
      title: 'Why Choose Us — Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'chooseUsButtonLabel',
      title: 'Choose Us — Button Label',
      type: 'string',
    }),
    defineField({
      name: 'chooseUsButtonUrl',
      title: 'Choose Us — Button URL',
      type: 'string',
    }),
    defineField({
      name: 'chooseUsTags',
      title: 'Choose Us — 8 Rounded Tags',
      type: 'array',
      validation: (rule) => rule.max(8),
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    // 8. DATA SECTION — 3 percentages
    defineField({
      name: 'dataTitle',
      title: 'Data Section — Title',
      type: 'string',
    }),
    defineField({
      name: 'dataSubtitle',
      title: 'Data Section — Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'dataButtonLabel',
      title: 'Data — Button Label',
      type: 'string',
    }),
    defineField({
      name: 'dataButtonUrl',
      title: 'Data — Button URL',
      type: 'string',
    }),
    defineField({
      name: 'dataStats',
      title: 'Data — 3 Percentage Boxes',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [
        {
          type: 'object',
          fields: [
            { name: 'percentage', type: 'string', title: 'Percentage (e.g. "97%")' },
            { name: 'title', type: 'string', title: 'Stat Title' },
          ],
          preview: { select: { title: 'percentage', subtitle: 'title' } },
        },
      ],
    }),

    // 9. TESTIMONIAL
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', rows: 4, title: 'Quote' },
        { name: 'author', type: 'string', title: 'Author Name' },
        { name: 'role', type: 'string', title: 'Author Role' },
        { name: 'avatar', type: 'image', title: 'Author Avatar', options: { hotspot: true } },
      ],
    }),

    // 10. FAQ
    defineField({
      name: 'faqHeading',
      title: 'FAQ — Section Heading',
      type: 'string',
      initialValue: 'Frequently asked questions',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', rows: 4, title: 'Answer' },
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),

    // 11. CONTACT / CUSTOM CTA
    defineField({
      name: 'contactHeading',
      title: 'Contact — Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'contactSubheading',
      title: 'Contact — Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contactButtonLabel',
      title: 'Contact — Button Label',
      type: 'string',
      initialValue: 'Start a Project',
    }),
    defineField({
      name: 'contactButtonUrl',
      title: 'Contact — Button URL',
      type: 'string',
      initialValue: '/contact',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' },
  },
});
