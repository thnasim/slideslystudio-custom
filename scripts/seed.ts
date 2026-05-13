/**
 * Seed script for Sanity.
 * Run with: npx sanity exec scripts/seed.ts --with-user-token
 *
 * Populates a few starter blog posts so the site has content on first deploy.
 * Edit, expand, or delete in the Studio after running.
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const author = {
  _id: 'author-tanvir',
  _type: 'author',
  name: 'Tanvir Hasan',
  slug: { _type: 'slug', current: 'tanvir-hasan' },
  role: 'Lead Designer',
  bio: 'Designer focused on turning complex business content into clear, compelling presentations.',
};

const posts = [
  {
    _id: 'post-why-design-matters',
    _type: 'post',
    title: 'Why Professional Presentation Design Matters for Business Growth',
    slug: { _type: 'slug', current: 'why-design-matters-for-business-growth' },
    excerpt:
      'In a competitive market, first impressions are made in seconds. Here is why investing in professional deck design pays back many times over.',
    category: 'strategy',
    publishedAt: '2026-01-15T10:00:00Z',
    readingTime: 7,
    author: { _type: 'reference', _ref: 'author-tanvir' },
    body: [
      block('h4', 'The hidden cost of DIY decks'),
      block(
        'normal',
        'Most teams underestimate what it actually costs to build presentations in-house. Hours wrestling with templates, inconsistent branding across slides, and design choices that quietly erode credibility — it adds up fast.'
      ),
      block(
        'normal',
        'Beyond the time, there is the opportunity cost. A weak deck at a key pitch can lose a six-figure deal. A flat investor presentation can mean a missed round. The stakes are too high to leave the design to chance.'
      ),
      block('h4', 'How professional design builds credibility'),
      block(
        'normal',
        'Polished slides signal competence. When the typography is consistent, the layout has air, and the visual hierarchy guides the eye, audiences subconsciously transfer that quality onto your business.'
      ),
      block('h4', 'The ROI of investing in design'),
      block(
        'normal',
        'If a professionally designed deck helps you close one extra deal a year, the investment pays for itself many times over. Factor in the time you get back, and the math tips clearly in favor of outsourcing.'
      ),
    ],
  },
  {
    _id: 'post-presentation-mistakes',
    _type: 'post',
    title: 'Common Presentation Mistakes That Are Costing You Clients',
    slug: { _type: 'slug', current: 'common-presentation-mistakes' },
    excerpt:
      'Your presentation might be quietly losing you clients. Here are seven mistakes we see most often, and how to fix them.',
    category: 'presentation-tips',
    publishedAt: '2026-01-22T10:00:00Z',
    readingTime: 8,
    author: { _type: 'reference', _ref: 'author-tanvir' },
    body: [
      block('h4', 'Mistake 1: Cramming every slide'),
      block(
        'normal',
        'Slides packed with paragraphs and bullets overwhelm audiences. The fix: one idea per slide. Supporting detail belongs in your spoken remarks, not on the screen.'
      ),
      block('h4', 'Mistake 2: Inconsistent branding'),
      block(
        'normal',
        'Mismatched fonts and colors make a deck feel like it was assembled from leftovers. Consistency builds trust before you say a word.'
      ),
      block('h4', 'Mistake 3: No visual hierarchy'),
      block(
        'normal',
        'When everything is bold, nothing is. Use size, weight, and color to direct attention to the one thing that matters on each slide.'
      ),
    ],
  },
  {
    _id: 'post-pitch-deck',
    _type: 'post',
    title: 'How to Build a Pitch Deck That Actually Attracts Investors',
    slug: { _type: 'slug', current: 'how-to-build-a-pitch-deck' },
    excerpt:
      'Investors review hundreds of decks a month. Here is what separates the ones that get a meeting from the ones that get archived.',
    category: 'strategy',
    publishedAt: '2026-02-05T10:00:00Z',
    readingTime: 9,
    author: { _type: 'reference', _ref: 'author-tanvir' },
    body: [
      block('h4', 'Why design quality is a proxy for company quality'),
      block(
        'normal',
        'Investors make snap judgments. A polished deck signals you take the work seriously and pay attention to detail. A sloppy one quietly raises a flag about your ability to execute elsewhere.'
      ),
      block('h4', 'The slides every deck needs'),
      block(
        'normal',
        'Title, problem, solution, market size, business model, traction, team, financials, ask. Each one focused, each one earning its place.'
      ),
      block('h4', 'Tell a story, not a feature list'),
      block(
        'normal',
        'The strongest decks take the room from problem to solution to vision in a single arc. Narrative beats a bullet list every time.'
      ),
    ],
  },
  {
    _id: 'post-powerpoint-vs-slides',
    _type: 'post',
    title: 'PowerPoint vs Google Slides: Which Should Your Business Pick?',
    slug: { _type: 'slug', current: 'powerpoint-vs-google-slides' },
    excerpt:
      'Picking presentation software depends on what you actually need. Here is a clear-eyed comparison across design, collaboration, cost, and compatibility.',
    category: 'tools',
    publishedAt: '2026-02-18T10:00:00Z',
    readingTime: 6,
    author: { _type: 'reference', _ref: 'author-tanvir' },
    body: [
      block('h4', 'Design depth'),
      block(
        'normal',
        'PowerPoint gives you more granular control — typography, animation, layout precision. For high-stakes decks where polish matters, it has the edge.'
      ),
      block('h4', 'Collaboration'),
      block(
        'normal',
        'Google Slides was built around real-time collaboration. Multiple editors, instant comments, link-based sharing. PowerPoint has caught up but Slides still feels smoother for distributed teams.'
      ),
      block('h4', 'The honest answer'),
      block(
        'normal',
        'Most teams end up using both. Pick the right tool for the moment instead of forcing one into every situation.'
      ),
    ],
  },
];

function block(style: string, text: string) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
  };
}

async function run() {
  console.log('Seeding author...');
  await client.createOrReplace(author);

  console.log('Seeding posts...');
  for (const p of posts) {
    await client.createOrReplace(p);
    console.log(`  ✓ ${p.title}`);
  }

  console.log('\nDone. Visit /studio to view and edit.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
