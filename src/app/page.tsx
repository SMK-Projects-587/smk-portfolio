import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Impact } from '@/components/Impact';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl">
        {/* Navbar + hero fill exactly the first screen on mobile */}
        <div className="flex min-h-dvh flex-col md:min-h-0">
          <Navbar />
          <Hero />
        </div>
        <Impact />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
