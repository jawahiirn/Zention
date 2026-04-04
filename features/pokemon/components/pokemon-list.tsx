'use client';

import { useQuery } from '@tanstack/react-query';
import { pokemonListQuery } from '@/features/pokemon/api/queries';
import Link from 'next/link';
import Image from 'next/image';

export function PokemonList() {
  const { data, isLoading, isError } = useQuery(pokemonListQuery(20));

  if (isLoading)
    return (
      <div className='grid animate-pulse grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5'>
        {[...Array(20)].map((_, i) => (
          <div key={i} className='bg-muted aspect-square rounded-2xl border' />
        ))}
      </div>
    );

  if (isError) return <div className='font-medium text-red-500'>Error fetching Pokemon</div>;

  return (
    <div className='grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5'>
      {data?.results.map((pokemon) => {
        // Extract ID from URL: https://pokeapi.co/api/v2/pokemon/1/
        const id = pokemon.url.split('/').filter(Boolean).pop();
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        return (
          <Link
            href={`/pokemon/${pokemon.name}`}
            key={pokemon.name}
            className='group bg-card/40 hover:bg-card hover:border-primary/50 hover:shadow-primary/10 relative flex transform flex-col items-center rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'
          >
            <div className='relative mb-4 size-32 transition-transform duration-300 group-hover:scale-110'>
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw'
                className='object-contain drop-shadow-xl'
              />
            </div>
            <div className='text-center'>
              <span className='text-muted-foreground mb-1 block font-mono text-xs'>#{id?.padStart(3, '0')}</span>
              <h3 className='group-hover:text-primary text-lg font-bold tracking-tight capitalize transition-colors'>
                {pokemon.name}
              </h3>
            </div>
            <div className='bg-primary/20 group-hover:bg-primary absolute top-3 right-3 size-2 rounded-full transition-colors' />
          </Link>
        );
      })}
    </div>
  );
}
