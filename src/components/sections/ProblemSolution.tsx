import { X, Check } from 'lucide-react';

const problems = [
  'No time to design',
  'Inconsistent slides',
  'Old, uneditable files',
  'Mismatched decks',
  'Low audience engagement',
];

const solutions = [
  'Stunning slides delivered within hours',
  'Branded decks, consistent every time',
  'Any file, fully editable output',
  'On-brand templates you can reuse',
  'Designs that impress and convert',
];

export default function ProblemSolution() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="pill mb-6">Why Most Teams Burn Out</p>
          <h2 className="font-display text-display-md">
            The problem, <span className="italic text-accent">solved.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-ink-100 bg-ink-50 p-8">
            <h3 className="font-display text-2xl mb-6">Your problem</h3>
            <ul className="space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex items-center gap-3 text-muted">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <X size={14} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-ink-50 p-8">
            <h3 className="font-display text-2xl mb-6">Our solution</h3>
            <ul className="space-y-4">
              {solutions.map((s) => (
                <li key={s} className="flex items-center gap-3 text-cream">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Check size={14} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
