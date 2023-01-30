import authApi from '@apis/auth/authApi';
import { Token } from '@utils/localStorage/token';
import { useMutation } from 'react-query';

const usePostLogin = () => {
  return useMutation<Token, Error, Login>('useLoginMuation', (data) =>
    authApi.postLogin(data),
  );
};
export default usePostLogin;
