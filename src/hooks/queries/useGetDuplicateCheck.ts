import authApi from '@apis/auth/authApi';
import { useQueries, useQuery, UseQueryOptions } from 'react-query';

interface DuplicateCheck {
  userId: string;
  email: string;
  nickname: string;
}

const useGetDuplicateCheck = ({ userId, email, nickname }: DuplicateCheck) => {
  return useQueries(
    [
      {
        queryKey: 'useGetCheckId',
        queryFn: () => authApi.getCheckId(userId),
        enabled: !!userId,
      },
      {
        queryKey: 'useGetCheckNickname',
        queryFn: () => authApi.getCheckNickname(nickname),
        enabled: !!nickname,
      },
      {
        queryKey: 'useGetCheckEmail',

        queryFn: () => authApi.getCheckEmail(email),
        enabled: !!email,
      },
    ].map<UseQueryOptions<any, Error>>((query) => ({
      ...query,
      retry: false,
      refetchOnWindowFocus: false,
    })),
  );
};

export { useGetDuplicateCheck };
