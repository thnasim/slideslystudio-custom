import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FAQ from '@/components/sections/FAQ';
import { Mail } from 'lucide-react';
import { SITE } from '@/lib/constants';

export const metadata = {
  title: 'Contact — Start a Project',
  description: 'Reach out to start your next presentation design project.',
};

const inquiryTypes = [
  'Business Inquiry',
  'Want My Slides Edited',
  'Send Me Samples',
  'Long-Term Collaboration',
];

const budgets = ['$99 – $499', '$500 – $1,499', '$1,500 – $4,999', '$5,000+'];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="container-x pb-20">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="pill mb-6">Contact</p>
              <h1 className="font-display text-display-lg mb-6">
                Start your <br />
                <span className="italic text-accent">next project.</span>
              </h1>
              <p className="text-muted mb-10">
                Ready to start a project or have a question? Reach out and we&apos;ll
                respond within a few hours.
              </p>

              <div className="rounded-3xl border border-ink-100 bg-ink-50 p-6">
                <p className="text-xs uppercase tracking-widest text-muted mb-3">
                  Prefer email?
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 font-display text-2xl hover:text-accent transition-colors"
                >
                  <Mail size={20} className="text-accent" />
                  {SITE.email}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form className="rounded-3xl border border-ink-100 bg-ink-50 p-8 md:p-10 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Name">
                    <input
                      type="text"
                      name="name"
                      required
                      className="input"
                      placeholder="Your full name"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      name="email"
                      required
                      className="input"
                      placeholder="you@company.com"
                    />
                  </Field>
                </div>

                <Field label="Project Type">
                  <select name="projectType" required className="input">
                    <option value="">Select a project type</option>
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Budget">
                  <select name="budget" className="input">
                    <option value="">Select a budget range</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Drop a Message">
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="input resize-none"
                    placeholder="Tell us about your project, goals, and timeline."
                  />
                </Field>

                <button type="submit" className="btn-primary w-full justify-center">
                  Submit
                </button>

                <p className="text-xs text-muted text-center">
                  This is a demo form. Wire it up to your provider of choice
                  (Resend, Formspree, Vercel server actions, etc.).
                </p>
              </form>
            </div>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />

      <style>{`
        .input {
          width: 100%;
          background: #18181B;
          border: 1px solid #27272A;
          border-radius: 0.75rem;
          padding: 0.875rem 1rem;
          color: #F5F1EA;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: #FF6B3D;
        }
        .input::placeholder { color: #71717A; }
      `}</style>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted mb-2 block">
        {label}
      </span>
      {children}
    </label>
  );
}
