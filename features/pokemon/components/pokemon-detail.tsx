'use client';

import { useQuery } from '@tanstack/react-query';
import { pokemonDetailsQuery } from '@/features/pokemon/api/queries';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useI18n } from '@/features/i18n/use-i18n';

interface Props {
  name: string;
}

export const PokemonDetails = ({ name }: Props) => {
  const router = useRouter();
  const { Details } = useI18n();
  const { data: pokemon, isLoading, isError } = useQuery(pokemonDetailsQuery(name));

  if (isLoading) return <div className="flex min-h-screen items-center justify-center font-medium italic animate-pulse">{Details.loading}</div>;
  if (isError || !pokemon)
    return (
      <div className="flex min-h-screen items-center justify-center flex-col gap-4">
        <div className="text-red-500 font-semibold">{Details.error}</div>
        <Button onClick={() => router.back()}>{Details.goBack}</Button>
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-background font-sans">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 pl-0 hover:pl-2 transition-all">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {Details.back}
        </Button>
        <div className="bg-card text-card-foreground rounded-xl border shadow-sm overflow-hidden">
          <div className="p-8 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                fill
                className="object-contain pixelated"
                priority
              />
            </div>
            <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>
            <div className="flex gap-2 mb-8">
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize"
                >
                  {type.name}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-8 w-full max-w-xs border-t pt-8">
              <div className="text-center group">
                <div className="text-sm text-muted-foreground mb-1 group-hover:text-primary transition-colors">{Details.height}</div>
                <div className="text-xl font-bold tracking-tight">{pokemon.height / 10} m</div>
              </div>
              <div className="text-center group border-l">
                <div className="text-sm text-muted-foreground mb-1 group-hover:text-primary transition-colors">{Details.weight}</div>
                <div className="text-xl font-bold tracking-tight">{pokemon.weight / 10} kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
