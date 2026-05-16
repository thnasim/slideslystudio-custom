import { defineField, defineType } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    // HERO
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'logo',
      title: 'Client Logo (white version recommended)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // ABOUT + SIDEBAR
    defineField({
      name: 'about',
      title: 'Short About the Project',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'duration',
      title: 'Project Duration',
      type: 'string',
      description: 'e.g. "3 weeks", "2 months"',
    }),

    // FULL-WIDTH IMAGE
    defineField({
      name: 'featureImage',
      title: 'Full-Width Feature Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // PROCESS — 3 STEPS
    defineField({
      name: 'processSteps',
      title: 'Process (3 Steps)',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Step Title' },
            { name: 'description', type: 'text', rows: 3, title: 'Description' },
            { name: 'image', type: 'image', title: 'Step Image', options: { hotspot: true } },
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
    }),

    // VIDEO + 2 IMAGES
    defineField({
      name: 'videoUrl',
      title: 'Video Loop URL (MP4)',
      type: 'url',
      description: 'Direct link to an MP4 file (hosted anywhere)',
    }),
    defineField({
      name: 'videoThumbnail',
      title: 'Video Poster Image (shows before video loads)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'belowVideoImages',
      title: 'Two Images Below Video',
      type: 'array',
      validation: (rule) => rule.max(2),
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // RESULTS — 2 STATS + TIMELINE
    defineField({
      name: 'resultsHeading',
      title: 'Results Section Heading',
      type: 'string',
      initialValue: 'The Results',
    }),
    defineField({
      name: 'stats',
      title: 'Results Stats (2 big numbers)',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'string', title: 'Big Number (e.g. "5×", "240%")' },
            { name: 'label', type: 'string', title: 'Label below the number' },
          ],
          preview: { select: { title: 'number', subtitle: 'label' } },
        },
      ],
    }),
    defineField({
      name: 'timeline',
      title: 'Project Timeline',
      type: 'string',
      description: 'e.g. "Jan 2026 — Mar 2026"',
    }),

    // TESTIMONIAL
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

    // RELATED
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related Case Studies (up to 3)',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
    }),

    // CTA
    defineField({
      name: 'ctaHeading',
      title: 'Bottom CTA Heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA Button Label',
      type: 'string',
      initialValue: 'Book a Call',
    }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'CTA Button URL',
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
    select: { title: 'title', media: 'logo', subtitle: 'industry' },
  },
});
