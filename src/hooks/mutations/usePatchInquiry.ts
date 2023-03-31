import profileApi from '@apis/profile/profileApi';
import { queryClient } from 'pages/_app';
import { useMutation } from '@tanstack/react-query';

const usePatchInquiry = (inquiryId: number, formData: any) => {
  return useMutation<any, Error>(
    ['usePatchInquiry'],
    () => profileApi.patchInquiry(inquiryId, formData),
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['usePatchInquiry'] });
        const previousValue = queryClient.getQueryData(['useGetInquiry']);
        queryClient.setQueryData(['useGetInquiry'], (old: any) => {
          return {
            ...old,
            formData,
          };
        });
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
export default usePatchInquiry;
