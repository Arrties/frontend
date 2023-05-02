import authApi from '@apis/auth/authApi';
import { Token } from '@utils/localStorage/token';
import { useMutation } from '@tanstack/react-query';

const usePostLogin = () => {
  return useMutation<Token, Error, Login>(
    ['useLoginMuation'],
    (data) => authApi.postLogin(data),
    {
      useErrorBoundary: false,
    },
  );
};
export default usePostLogin;
