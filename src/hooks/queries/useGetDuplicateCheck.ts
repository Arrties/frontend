import authApi from '@apis/auth/authApi';
import { useQueries, useQuery } from 'react-query';

const useGetCheckId = (userId: string) => {
  return useQuery<any, Error>(
    'useGetCheckId',
    () => authApi.getCheckId(userId),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!userId,
    },
  );
};

const useGetCheckEmail = (email: string) => {
  return useQuery<any, Error>(
    'useGetCheckEmail',
    () => authApi.getCheckEmail(email),
    { retry: false, refetchOnWindowFocus: false, enabled: !!email },
  );
};

const useGetCheckNickname = (nickname: string) => {
  return useQuery<any, Error>(
    'useGetCheckNickname',
    () => authApi.getCheckNickname(nickname),
    { retry: false, refetchOnWindowFocus: false, enabled: !!nickname },
  );
};

export {
  useGetCheckId,
  useGetCheckEmail,
  useGetCheckNickname,
  useGetDuplicateCheck,
};

interface DuplicateCheck {
  userId: string;
  email: string;
  nickname: string;
}

const useGetDuplicateCheck = ({ userId, email, nickname }: DuplicateCheck) => {
  return useQueries([
    {
      queryKey: 'useGetCheckId',
      queryFn: () => authApi.getCheckId(userId),
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!userId,
    },
    {
      queryKey: 'useGetCheckEmail',
      queryFn: () => authApi.getCheckEmail(email),
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!email,
    },
    {
      queryKey: 'useGetCheckNickname',
      queryFn: () => authApi.getCheckNickname(nickname),
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!nickname,
    },
  ]);
};
