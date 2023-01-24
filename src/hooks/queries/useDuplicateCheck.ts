import authApi from '@apis/auth/authApi';
import { useQuery } from 'react-query';
import { useState } from 'react';

const useDuplicateCheck = (type: string, data: string) => {
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const query = useQuery([type, data], authApi.getDuplicateCheck, {
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: (response: any) => {
      return response;
    },
    onError: (error: any) => {
      if (error.status === 409) {
        return error;
      }
    },
  });
  return { ...query, isDuplicate };
};

export default useDuplicateCheck;
