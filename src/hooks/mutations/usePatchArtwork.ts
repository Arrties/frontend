import { useRouter } from 'next/router';
import artworkApi from '@apis/artwork/artworkApi';

import { useMutation } from '@tanstack/react-query';

const usePatchArtwork = (id: number) => {
  const router = useRouter();
  return useMutation(
    ['usePatchArtwork'],
    (data: FormData) => artworkApi.patchArtwork(id, data),
    {
      useErrorBoundary: false,
      onSuccess: (data) => {
        router.replace({
          pathname: '/auction/view' + id,
        });
      },
    },
  );
};
export default usePatchArtwork;
