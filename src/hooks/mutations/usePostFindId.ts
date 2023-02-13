import authApi from '@apis/auth/authApi';

import { useMutation } from 'react-query';

const usePostFindId = () => {
  return useMutation(
    'usePostFindId',
    (email: string) => authApi.postFindId(email),
    {
      useErrorBoundary: false,
    },
  );
};
export default usePostFindId;
