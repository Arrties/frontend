import profileApi from '@apis/profile/profileApi';
import { queryClient } from 'pages/_app';
import { useMutation } from '@tanstack/react-query';

const useDeleteInquiry = (inquiryId: number) => {
  return useMutation<any, Error>(
    ['useDeleteInquiry'],
    () => profileApi.deleteInquiry(inquiryId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['useDeleteInquiry'] });
        const previousValue = queryClient.getQueryData(['useGetInquiry']);
        queryClient.setQueryData(['useGetInquiry'], (old: any) =>
          old.filter((t) => t.id !== inquiryId),
        );
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueryData(['useGetInquiry'], context.previousValue);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetInquiry'],
        });
      },
    },
  );
};

export default useDeleteInquiry;
