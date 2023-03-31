import profileApi from '@apis/profile/profileApi';
import { queryClient } from 'pages/_app';
import { useMutation } from '@tanstack/react-query';

const usePostInquiry = (formData: any) => {
  return useMutation<any, Error>(
    ['usePostInquiry'],
    () => profileApi.postInquiry(formData),
    {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetInquiry'],
        });
      },
    },
  );
};

export default usePostInquiry;
