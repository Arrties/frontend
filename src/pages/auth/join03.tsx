import ErrorMessage from '@components/common/ErrorMessage';
import Layout from '@components/common/Layout';
import Image from 'next/image';
import { useAppSelector } from '@features/hooks';
import { useRouter } from 'next/router';

import Button from '../../components/common/Button';
import useUserJoin from '../../hooks/queries/useUserJoin';
import Navigate from '@components/common/Navigate';

interface Member extends User {
  keywords: string[];
}

function Join03() {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);
  const handleNextButton = () => {
    router.push('/auth/join04');
  };
  const { mutation, errorMessage } = useUserJoin();
  const handleSkipButton = async () => {
    const memberInfo: Member = {
      userId: userState.userId,
      nickname: userState.nickname,
      password: userState.password,
      telephone: userState.telephone,
      email: userState.email,
      keywords: [],
    };
    mutation.mutate(memberInfo);
  };
  return (
    <Layout>
      <Navigate isLeftButton={false} isRightButton={false} />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          className="absolute left-[100px] top-[620px]"
        />
      )}
      <div className="text-18 ">
        <span className="font-bold text-brand ">취향 분석</span>을 통해
        <br />
        나에게 <span className="font-bold">딱 맞는</span> <br />
        작품을 추천 받아보세요
      </div>
      <Image
        alt=""
        src="/svg/example/example_keyword.svg"
        width="0"
        height="0"
        className="mt-7 w-full"
      />

      <Button
        text="분석 시작"
        className="absolute inset-x-0 bottom-[100px] m-auto"
        onClick={handleNextButton}
      />
      <button
        className="hover:brand-2 absolute inset-x-0 bottom-[60px] m-auto w-full  text-xs font-normal text-[#999999] underline transition "
        onClick={handleSkipButton}
      >
        다음에 할래요
      </button>
    </Layout>
  );
}

export default Join03;
