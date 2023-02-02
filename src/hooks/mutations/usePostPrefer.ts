import artworkApi from '@apis/artwork/artworkApi';
import { useMutation, useQueryClient } from 'react-query';

const queryClient = useQueryClient();

const usePostPrefer = (artWorkId: number) => {
  return useMutation<any, Error>(
    'usePostPrefer',
    () => artworkApi.postPrefer(artWorkId),
    {
      retry: false,
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['useGetPostPrefer'] });
        const previousValue = queryClient.getQueryData(['useGetDetail']);
        queryClient.setQueryData(['useGetDetail'], (old: any) => {
          return {
            ...old,
            artWorkList: old.artWorkList.map((artwork: any) => {
              if (artwork.id === artWorkId) {
                return {
                  ...artwork,
                  isPrefer: true,
                };
              }
              return artwork;
            }),
          };
        });
        return { previousValue };
      },
      onError: (err, variables, context: any) => {
        queryClient.setQueryData(['useGetDetail'], context.previousValue);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetDetail'],
        });
      },
    },
  );
};

export default usePostPrefer;
