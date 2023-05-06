import authApi from '@apis/auth/authApi';
import { useQueries, UseQueryOptions } from '@tanstack/react-query';

const useGetDuplicateCheck = ({ userId, email, nickname }: DuplicateCheck) => {
  return useQueries({queries:
  
    [
      {
        queryKey: ['useGetCheckId'],
        queryFn: () => authApi.getCheckId(userId),
        enabled: !!userId,
      },
      {
        queryKey: ['useGetCheckNickname'],
        queryFn: () => authApi.getCheckNickname(nickname),
        enabled: !!nickname,
      },
      {
        queryKey: ['useGetCheckEmail'],

        queryFn: () => authApi.getCheckEmail(email),
        enabled: !!email,
      },
    ].map<UseQueryOptions<any, Error>>((query) => ({
        ...query,
        suspense: false,
      })
      ),
    }
  );
};

export { useGetDuplicateCheck };
