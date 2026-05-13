const reviews = [
  {
    handle: '@hollyao',
    body: 'Always a great experience. I trust the team with all my PowerPoint needs.',
  },
  {
    handle: '@matteo_fabbiani',
    body: 'Did exactly what I asked for on the first try. No back and forth.',
  },
  {
    handle: '@prutwo',
    body: 'I&apos;ll be using these services again the next time I need help with Google Slides.',
  },
  {
    handle: '@christinathiele',
    body: 'My experience was exceptional from start to finish. Highly recommend.',
  },
  {
    handle: '@kathrynbprice',
    body: 'Another fantastic job. I keep coming back for the consistency.',
  },
  {
    handle: '@jens_voets',
    body: 'It&apos;s the eighth time this team has helped me out. Says it all really.',
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-28 md:py-36">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="pill mb-6">Loved by Clients</p>
          <h2 className="font-display text-display-md">
            We don&apos;t just deliver fast — <br />
            <span className="italic text-accent">we deliver decks that work.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.handle}
              className="rounded-3xl border border-ink-100 bg-ink-50 p-8 transition-colors hover:border-accent/30"
            >
              <div className="flex gap-0.5 text-accent mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <blockquote
                className="text-cream leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: r.body }}
              />
              <figcaption className="text-sm text-muted">{r.handle}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
