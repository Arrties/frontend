import artworkApi from '@apis/artwork/artworkApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

const useDeletePrefer = (artWorkId: number) => {
  return useMutation<any, Error>(
    'useDeletePrefer',
    () => artworkApi.postDeletePrefer(artWorkId),
    {
      retry: false,
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['useDeletePrefer'] });
        const previousValue = queryClient.getQueryData(['useGetDetail']);
        queryClient.setQueryData(['useGetDetail'], (old: any) => {
          return {
            ...old,
            preferred: false,
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

export default useDeletePrefer;
