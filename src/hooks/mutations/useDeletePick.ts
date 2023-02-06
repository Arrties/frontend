import artworkApi from '@apis/artwork/artworkApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

const useDeletePick = (artWorkId: number) => {
  return useMutation<any, Error>(
    'useDeletePick',
    () => artworkApi.deletePrefer(artWorkId),
    {
      retry: false,
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['useDeletePick'] });
        const previousValue = queryClient.getQueryData(['useGetPickDetail']);
        queryClient.setQueryData(['useGetPickDetail'], (old: any) => {
          return {
            ...old,
            pick: false,
          };
        });
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueryData(['useGetPickDetail'], context.previousValue);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetPickDetail'],
        });
      },
    },
  );
};

export default useDeletePick;
