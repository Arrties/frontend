import artworkApi from '@apis/artwork/artworkApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

const usePostPick = (artWorkId: number) => {
  return useMutation<any, Error>(
    'usePostPick',
    () => artworkApi.postPrefer(artWorkId),
    {
      retry: false,
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['usePostPick'] });
        const previousValue = queryClient.getQueryData(['useGetPickDetail']);
        queryClient.setQueryData(['useGetPickDetail'], (old: any) => {
          return {
            ...old,
            pick: true,
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

export default usePostPick;
