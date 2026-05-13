import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/ui/Marquee';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Works from '@/components/sections/Works';
import ProblemSolution from '@/components/sections/ProblemSolution';
import Pricing from '@/components/sections/Pricing';
import Reviews from '@/components/sections/Reviews';
import FAQ from '@/components/sections/FAQ';
import RecentBlog from '@/components/sections/RecentBlog';

const marqueeItems = [
  'Ready to Present',
  'Within Hours',
  'Master Slide Template',
  'Convert to Slides',
  'Consistent Design',
  'Express Delivery',
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <Marquee items={marqueeItems} />
        <Services />
        <Process />
        <Works />
        <ProblemSolution />
        <Pricing />
        <Reviews />
        <RecentBlog />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
