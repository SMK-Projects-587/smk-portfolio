import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-6xl">
      {/* Navbar + hero fill exactly the first screen on mobile */}
      <div className="flex min-h-dvh flex-col md:min-h-0">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}
