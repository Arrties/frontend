import artworkApi from '@apis/artwork/artworkApi';

import { useMutation } from 'react-query';

const usePostArtwork = () => {
  return useMutation(
    'usePostArtwork',
    (data: FormData) => artworkApi.postArtwork(data),
    {
      useErrorBoundary: false,
    },
  );
};
export default usePostArtwork;
