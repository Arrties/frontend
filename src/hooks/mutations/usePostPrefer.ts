import artworkApi from '@apis/artwork/artworkApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

const usePostPrefer = (artWorkId: number) => {
  return useMutation<any, Error>(
    'usePostPrefer',
    () => artworkApi.postPrefer(artWorkId),
    {
      retry: false,
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['usePostPrefer'] });
        const previousValue = queryClient.getQueryData(['useGetDetail']);
        queryClient.setQueryData(['useGetDetail'], (old: any) => {
          return {
            ...old,
            preferred: true,
          };
        });
        return { previousValue };
      },
      onError: (context: any) => {
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
