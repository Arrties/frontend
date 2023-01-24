import ErrorMessage from '@components/common/ErrorMessage';
import Layout from '@components/common/Layout';
import Image from 'next/image';
import { useAppSelector } from '@features/hooks';
import { useRouter } from 'next/router';

import Button from '../../components/common/Button';
import useUserJoin from '../../hooks/queries/useUserJoin';

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
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          className="absolute left-[100px] top-[620px]"
        />
      )}
      <div className="text-18 ">
        <span className="text-brand font-bold ">취향 분석</span>을 통해
        <br />
        나에게 <span className="font-bold">딱 맞는</span> <br />
        작품을 추천 받아보세요
      </div>
      <Image
        alt=""
        src="/svg/example/example_keyword.svg"
        width="0"
        height="0"
        className="w-full mt-7"
      />

      <Button
        text="분석 시작"
        className="absolute bottom-[100px] inset-x-0 m-auto w-[327px] "
        onClick={handleNextButton}
      />
      <button
        className="w-full transition text-xs underline hover:brand-2 text-[#999999]  font-normal absolute bottom-[60px] inset-x-0 m-auto "
        onClick={handleSkipButton}
      >
        다음에 할래요
      </button>
    </Layout>
  );
}

export default Join03;
