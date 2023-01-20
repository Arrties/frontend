import { useQuery } from 'react-query';
import { useState } from 'react';
import instance from '@apis/_axios/instance';

const useGetProfile = () => {
  const [userInfo, setUserInfo] = useState<Member>();

  const query = useQuery(
    'useGetProfile',
    async () => {
      const res = await instance(`/members/me`);
      return res;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (res: any) => {
        setUserInfo(res?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, userInfo, setUserInfo };
};

export default useGetProfile;
