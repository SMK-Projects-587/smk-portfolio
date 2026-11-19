import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Impact } from '@/components/Impact';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl">
        {/* Navbar + hero fill exactly the first screen on mobile. svh (not dvh)
            stays fixed when the mobile address bar hides on scroll, so the
            hero illustration doesn't grow mid-scroll. */}
        <div className="flex min-h-svh flex-col md:min-h-0">
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
