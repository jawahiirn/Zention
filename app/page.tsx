import { getTranslations } from 'next-intl/server';
import { getQueryClient } from '@/shared/lib/query-client';
import { prefetchPokemonList } from '@/features/pokemon/api/prefetch';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { PokemonList } from '@/features/pokemon/components/pokemon-list';
import { Header } from '@/shared/components/header';
import { FeatureSection } from '@/shared/components/feature-section';

export default async function Home() {
  const t = await getTranslations('Index');
  const queryClient = getQueryClient();

  await prefetchPokemonList(queryClient, 20);

  return (
    <div className="flex min-h-screen flex-col items-center gap-12 p-8 md:p-12 font-sans bg-background/50 selection:bg-primary/20">
      <Header />

      <main className="w-full max-w-5xl flex flex-col items-center gap-16 md:gap-24">
        {/* Welcome Section */}
        <section className="text-center space-y-6 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent italic">
            {t('welcome')}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </section>

        {/* Modular Features */}
        <FeatureSection />

        {/* Prefetched & Hydrated List */}
        <div className="w-full space-y-10 group">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight">{t('explore')}</h2>
            <div className="h-px flex-1 bg-border/50 group-hover:bg-primary/20 transition-colors" />
          </div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <PokemonList />
          </HydrationBoundary>
        </div>
      </main>

      <footer className="mt-auto pt-16 text-sm text-muted-foreground/50 italic select-none">
        Copyright © 2026 Pokedex Architecture Reference. All Rights Reserved.
      </footer>
    </div>
  );
}
