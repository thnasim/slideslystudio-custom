const steps = [
  {
    number: '01',
    title: 'Share your requirement',
    body: 'Send your files — Docs, Google Drive, Dropbox, whatever works for you. We figure out what the deck needs to do.',
  },
  {
    number: '02',
    title: 'We do our magic',
    body: 'We work on alignment, visuals, color, typography, and add transitions that move the story forward without distracting from it.',
  },
  {
    number: '03',
    title: 'Feedback? Easy.',
    body: 'Want something changed? Smooth revision rounds keep going until everything sits exactly the way you wanted it to.',
  },
  {
    number: '04',
    title: 'Present and grow',
    body: 'Final deck delivered in your preferred format, ready to present. Then we ship the wins together.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative border-y border-ink-100 bg-ink-50/40 py-28 md:py-36">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="pill mb-6">How It Works</p>
          <h2 className="font-display text-display-md">
            A quick overview of how <br />
            <span className="italic text-accent">we work together.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-3xl border border-ink-100 bg-ink p-8"
            >
              <div className="font-display text-6xl italic text-accent/40 mb-4">
                {step.number}
              </div>
              <h3 className="font-display text-2xl mb-3">{step.title}</h3>
              <p className="text-muted leading-relaxed text-sm">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
