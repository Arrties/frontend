import artworkApi from '@apis/artwork/artworkApi';
import profileApi from '@apis/profile/profileApi';
import { queryClient } from 'pages/_app';
import { useMutation } from '@tanstack/react-query';

const useDeletePick = (artistId: number) => {
  return useMutation<any, Error>(
    ['useDeletePick'],
    () => profileApi.deletePick(artistId),
    {
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
