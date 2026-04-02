'use client';

import { useQuery } from '@tanstack/react-query';
import { pokemonListQuery } from '@/features/pokemon/api/queries';
import Link from 'next/link';
import Image from 'next/image';

export function PokemonList() {
  const { data, isLoading, isError } = useQuery(pokemonListQuery(20));

  if (isLoading) return <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-pulse">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="aspect-square rounded-2xl bg-muted border" />
    ))}
  </div>;

  if (isError) return <div className="text-red-500 font-medium">Error fetching Pokemon</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {data?.results.map((pokemon) => {
        // Extract ID from URL: https://pokeapi.co/api/v2/pokemon/1/
        const id = pokemon.url.split('/').filter(Boolean).pop();
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        return (
          <Link 
            href={`/pokemon/${pokemon.name}`} 
            key={pokemon.name} 
            className="group relative flex flex-col items-center p-6 rounded-2xl border bg-card/40 hover:bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative size-32 mb-4 group-hover:scale-110 transition-transform duration-300">
               <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                className="object-contain drop-shadow-xl"
              />
            </div>
            <div className="text-center">
              <span className="text-xs font-mono text-muted-foreground mb-1 block">#{id?.padStart(3, '0')}</span>
              <h3 className="font-bold capitalize tracking-tight group-hover:text-primary transition-colors text-lg">
                {pokemon.name}
              </h3>
            </div>
            <div className="absolute top-3 right-3 size-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
          </Link>
        );
      })}
    </div>
  );
}
