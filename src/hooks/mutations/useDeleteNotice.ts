import profileApi from '@apis/profile/profileApi';
import { queryClient } from 'pages/_app';
import { useMutation } from '@tanstack/react-query';

const useDeleteNotice = (noticeId: number) => {
  return useMutation<any, Error>(
    ['useDeleteNotice'],
    () => profileApi.deleteNotice(noticeId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['useDeleteNotice'] });
        const previousValue = queryClient.getQueryData(['useGetNotice']);
        queryClient.setQueryData(['useGetNotice'], (old: any) =>
          old.filter((t) => t.id !== noticeId),
        );
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueryData(['useGetNotice'], context.previousValue);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetNotice'],
        });
      },
    },
  );
};

export default useDeleteNotice;
