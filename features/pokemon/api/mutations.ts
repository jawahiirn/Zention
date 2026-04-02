import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPokemon } from './endpoints';
import { CreatePokemonRequest } from '../types';

/**
 * Staff+ Reference:
 * All write operations are abstracted into a custom mutation hook.
 * This pattern ensures that Side-effects (invalidation, logging, toast messages) 
 * are handled once and are not scattered across different UI components.
 */
export const useCreatePokemonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePokemonRequest) => createPokemon(data),
    
    // On success, we invalidate ALL queries starting with 'pokemon-list' 
    // to ensure the newly created Pokemon shows up in UI lists.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon-list'] });
    },
    
    // Standard error logging or future toast integrations can be placed here centrally.
    onError: (error) => {
      console.error('Failed to create pokemon:', error);
    }
  });
};
