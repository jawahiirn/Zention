'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/features/i18n/use-i18n';
import { pokemonDetailsQuery } from '@/services/queries';

interface Props {
  name: string;
}

export const PokemonDetails = ({ name }: Props) => {
  const router = useRouter();
  const { Details } = useI18n();
  const { data: pokemon, isLoading, isError } = useQuery(pokemonDetailsQuery(name));

  if (isLoading)
    return (
      <div className="flex min-h-screen animate-pulse items-center justify-center font-medium italic">
        {Details.loading}
      </div>
    );
  if (isError || !pokemon)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="font-semibold text-red-500">{Details.error}</div>
        <Button onClick={() => router.back()}>{Details.goBack}</Button>
      </div>
    );

  return (
    <div className="bg-background min-h-screen p-8 font-sans">
      <div className="mx-auto max-w-2xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 pl-0 transition-all hover:pl-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {Details.back}
        </Button>
        <div className="bg-card text-card-foreground overflow-hidden rounded-xl border shadow-sm">
          <div className="flex flex-col items-center p-8">
            <div className="relative mb-6 h-48 w-48">
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                fill
                className="pixelated object-contain"
                priority
              />
            </div>
            <h1 className="mb-4 text-4xl font-bold capitalize">{pokemon.name}</h1>
            <div className="mb-8 flex gap-2">
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium capitalize"
                >
                  {type.name}
                </span>
              ))}
            </div>
            <div className="grid w-full max-w-xs grid-cols-2 gap-8 border-t pt-8">
              <div className="group text-center">
                <div className="text-muted-foreground group-hover:text-primary mb-1 text-sm transition-colors">
                  {Details.height}
                </div>
                <div className="text-xl font-bold tracking-tight">{pokemon.height / 10} m</div>
              </div>
              <div className="group border-l text-center">
                <div className="text-muted-foreground group-hover:text-primary mb-1 text-sm transition-colors">
                  {Details.weight}
                </div>
                <div className="text-xl font-bold tracking-tight">{pokemon.weight / 10} kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
