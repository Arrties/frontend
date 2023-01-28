import ErrorMessage from '@components/common/ErrorMessage';
import Layout from '@components/common/Layout';
import Loader from '@components/common/Loader';
import Modal from '@components/common/Modal';
import SelectKeyword from '@components/profile/Selectkeyword';
import { useAppSelector } from '@features/hooks';
import useJoinMutation from '@hooks/mutations/useJoinMuation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from 'stories/Button';

export default function Join04() {
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const userState = useAppSelector((state) => state.user);
  const { mutate, isLoading } = useJoinMutation();
  const handleSubmit = (e: any) => {
    let memberInfo: Member = {
      userId: userState.userId,
      nickname: userState.nickname,
      password: userState.password,
      telephone: userState.telephone,
      email: userState.email,
      keywords: keywordList,
    };
    if (e.target.id === 'skip') {
      memberInfo = { ...memberInfo, keywords: [] };
    }
    mutate(memberInfo, {
      onSuccess: () => {
        router.push('/auth/login');
      },
    });
  };

  const router = useRouter();

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <div className="mt-16 text-16 font-semibold">
        관심있는 키워드를 골라주세요.
      </div>
      <SelectKeyword
        setKeywordList={setKeywordList}
        keywordList={keywordList}
      />
      <Button
        className="absolute inset-x-0 bottom-[100px] m-auto "
        text="분석 시작"
        onClick={() => {
          setIsModal(true);
        }}
        disabled={keywordList?.length === 0}
      />
      <button
        className="hover:brand-2 absolute inset-x-0 bottom-[60px]  m-auto w-full px-0 text-xs font-normal text-[#999999] underline transition"
        onClick={handleSubmit}
        id="skip"
      >
        다음에 할래요
      </button>
      <Modal
        message="취향 분석이 완료 되었습니다."
        isModal={isModal}
        onCloseModal={() => {
          setIsModal(false);
        }}
        onAccept={handleSubmit}
      />
    </Layout>
  );
}
