import instance from '@apis/_axios/instance'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'

const useUserJoin = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const mutation = useMutation(
    async (body: Member) => {
      await instance.post('/members/join', body);
    },
    {
      onSuccess: () => {
        router.push('/auth/login');
      },
      onError: (error: any) => {
        if (error.status === 200) {
          router.push('/auth/login');
        } else if (error.status === 409) {
          switch (error.code) {
            case 'EXIST_USER_ID':
              setErrorMessage('존재하는 아이디입니다.');
              break;
            case 'EXIST_USER_EMAIL':
              setErrorMessage('존재하는 이메일입니다.');
              break;
            case 'EXIST_NICKNAME':
              setErrorMessage('존재하는 닉네임입니다.');
              break;
          }
        }
      },
    },
  );
  return { mutation, errorMessage };
};

export default useUserJoin;
