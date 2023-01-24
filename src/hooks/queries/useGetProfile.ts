import instance from '@apis/_axios/instance';
import { useQuery } from 'react-query';
import { useState } from 'react';

const useGetProfile = () => {
  const [userInfo, setUserInfo] = useState<Member>();

  const query = useQuery(
    'useGetProfile',
    async () => {
      const response = await instance(`/members/me`);
      return response;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response: any) => {
        setUserInfo(response?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, userInfo, setUserInfo };
};

export default useGetProfile;
