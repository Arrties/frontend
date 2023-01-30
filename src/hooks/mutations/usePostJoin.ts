import authApi from '@apis/auth/authApi';
import { useMutation } from 'react-query';

const usePostJoin = () => {
  return useMutation<Member, Error, Member>('useJoinMuation', (data) =>
    authApi.postJoin(data),
  );
};
export default usePostJoin;
