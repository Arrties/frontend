import { useQuery } from 'react-query';
import authApi from '@apis/auth/authApi';
import { useState } from 'react';
import { Member } from 'types/user';

const useGetProfile = () => {
  const [userInfo, setUserInfo] = useState<Member>();
  const query = useQuery('useGetProfile', authApi.getUserProfile, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (res: any) => {
      setUserInfo(res?.data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  return { ...query, userInfo, setUserInfo };
};

export default useGetProfile;
