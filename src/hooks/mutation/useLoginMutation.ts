import authApi from '@apis/auth/authApi'
import { Token } from '@utils/localStorage/token'
import { useMutation } from 'react-query'

const useLoginMutation = () => {
  return useMutation<Token, Error, LoginForm>('useLoginMuation', (data) =>
    authApi.postLogin(data),
  );
};
export default useLoginMutation;
