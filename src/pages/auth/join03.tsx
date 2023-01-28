import ErrorMessage from '@components/common/ErrorMessage';
import Layout from '@components/common/Layout';
import Image from 'next/image';
import { useAppSelector } from '@features/hooks';
import { useRouter } from 'next/router';

import Button from '../../components/common/Button';
import useUserJoin from '../../hooks/queries/useUserJoin';
import Navigate from '@components/common/Navigate';
import KeywordBox from '@components/common/KeywordBox';

const KeywordList: string[] = ['사진', '소묘', '파스텔', '추상화'];

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
      <div className=" text-20 ">
        <span className="font-bold text-brand ">취향 분석</span>을 통해
        <br />
        나에게 <span className="font-bold">딱 맞는</span> <br />
        작품을 추천 받아보세요
      </div>
      <section className="my-5 mt-9">
        {KeywordList.map((keyword) => (
          <KeywordBox text={keyword} focused />
        ))}
      </section>
      <section className="flex flex-wrap gap-1">
        {Array(9)
          .fill(0)
          .map((it, idx) => (
            <Image
              alt="example"
              src={`/svg/example/example_artwork_${idx + 1}.svg`}
              width="0"
              height="0"
              className={`from-green w-3/12 grow  ${idx > 5 && 'opacity-50'}`}
            />
          ))}
      </section>

      <button
        className="hover:brand-2 absolute inset-x-0 bottom-[100px] m-auto w-full  text-xs font-normal text-[#999999] underline transition "
        onClick={handleSkipButton}
      >
        다음에 할래요
      </button>
      <Button
        text="분석 시작"
        className="absolute inset-x-0 bottom-[34px] m-auto w-[calc(100%-48px)]"
        onClick={handleNextButton}
      />
    </Layout>
  );
}

export default Join03;
