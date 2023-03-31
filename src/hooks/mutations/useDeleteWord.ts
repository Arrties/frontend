import artworkApi from '@apis/artwork/artworkApi';
import { queryClient } from 'pages/_app';
import { useMutation } from '@tanstack/react-query';

export const useDeleteWord = (wordId: number) => {
  return useMutation<any, Error>(
    ['useDeleteWord'],
    () => artworkApi.deleteRecentWord(wordId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['useDeleteWord'] });
        const previousValue = queryClient.getQueryData(['useGetRecentSearch']);
        queryClient.setQueryData(['useGetRecentSearch'], (old: any) =>
          old.filter((t) => t.id !== wordId),
        );
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueryData(['useGetRecentSearch'], context.previousValue);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetRecentSearch'],
        });
      },
    },
  );
};

export const useDeleteAllWord = () => {
  return useMutation<any, Error>(
    ['useDeleteAllWord'],
    () => artworkApi.deleteRecentAllWords(),
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['useDeleteAllWord'] });
        const previousValue = queryClient.getQueryData(['useGetRecentSearch']);
        queryClient.setQueryData(['useGetRecentSearch'], () => []);
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueryData(['useGetRecentSearch'], context.previousValue);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetRecentSearch'],
        });
      },
    },
  );
};
