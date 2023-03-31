import authApi from '@apis/auth/authApi';

import { useMutation } from '@tanstack/react-query';

const usePostFindPassword = () => {
  return useMutation(
    ['usePostFindPassword'],
    (email: string) => authApi.postNewPassword(email),
    {
      useErrorBoundary: false,
    },
  );
};
export default usePostFindPassword;
