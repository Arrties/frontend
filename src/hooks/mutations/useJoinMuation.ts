import authApi from '@apis/auth/authApi';
import { useMutation } from 'react-query';

const useJoinMutation = () => {
  return useMutation<Member, Error, Member>('useJoinMuation', (data) =>
    authApi.postMember(data),
  );
};
export default useJoinMutation;
