import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <section className="container-x py-32 text-center">
          <p className="pill mb-6">404</p>
          <h1 className="font-display text-display-xl mb-6">
            Slide <span className="italic text-accent">missing.</span>
          </h1>
          <p className="text-muted max-w-md mx-auto mb-10">
            The page you&apos;re looking for has been moved, renamed, or never
            existed in the first place.
          </p>
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
