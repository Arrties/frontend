import profileApi from '@apis/profile/profileApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

const usePostInquiry = (formData: any) => {
  return useMutation<any, Error>(
    'usePostInquiry',
    () => profileApi.postInquiry(formData),
    {
      retry: false,
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['usePostInquiry'] });
        const previousValue = queryClient.getQueryData(['useGetInquiry']);
        queryClient.setQueryData(['useGetInquiry'], (old: any) => {
          console.log(old);
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

export default usePostInquiry;
