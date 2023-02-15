import { useRouter } from 'next/router';
import artworkApi from '@apis/artwork/artworkApi';

import { useMutation } from 'react-query';

const usePostArtwork = (setIsErrorModal) => {
  const router = useRouter();
  return useMutation(
    'usePostArtwork',
    (data: FormData) => artworkApi.postArtwork(data),
    {
      useErrorBoundary: false,
      onSuccess: (data) => {
        router.push({
          pathname: '/auction/view',
          query: { id: data.artWork.id },
        });
      },
      onError: () => {
        setIsErrorModal(true);
      },
    },
  );
};
export default usePostArtwork;
