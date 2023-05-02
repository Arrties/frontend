import { useRouter } from 'next/router';
import artworkApi from '@apis/artwork/artworkApi';

import { useMutation } from '@tanstack/react-query';

const usePostArtwork = () => {
  const router = useRouter();
  return useMutation(
    ['usePostArtwork'],
    (data: FormData) => artworkApi.postArtwork(data),
    {
      useErrorBoundary: false,
      onSuccess: (data) => {
        router.replace({
          pathname: '/auction/view',
          query: { id: data.artWork.id },
        });
      },
    },
  );
};
export default usePostArtwork;
