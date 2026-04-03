import { Header } from '@/shared/components/header';

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-12 p-4 md:p-4 font-sans bg-background/50 selection:bg-primary/20">
      <Header />
      <main className="w-full max-w-5xl flex flex-col items-center gap-16 md:gap-24">
        <section className="text-center space-y-6 max-w-3xl">section</section>
      </main>
      <footer className="mt-auto text-sm text-muted-foreground/50 italic select-none">
        Copyright © 2026 Zention. All Rights Reserved
      </footer>
    </div>
  );
}
