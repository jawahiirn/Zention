import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { pokemonDetailsQuery } from '@/features/pokemon/api/queries';
import { PokemonDetails } from '@/features/pokemon/components/pokemon-detail';
import { getQueryClient } from '@/shared/lib/query-client';

interface Props {
  params: Promise<{ name: string }>;
}

export default async function Page({ params }: Props) {
  const { name } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(pokemonDetailsQuery(name));
  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <PokemonDetails name={name} />
    </HydrationBoundary>
  );
}
