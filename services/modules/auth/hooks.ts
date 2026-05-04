import { useMutation } from '@tanstack/react-query';
import { login, signup } from './endpoints';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
  });
};
