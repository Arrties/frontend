import ErrorMessage from '@components/common/ErrorMessage';
import Layout from '@components/common/Layout';
import SelectKeyword from '@components/profile/Selectkeyword';
import { useAppSelector } from '@features/hooks';
import { useState } from 'react';

import useUserJoin from '../../hooks/queries/useUserJoin';

export default function Join04() {
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const userState = useAppSelector((state) => state.user);
  const { mutation, errorMessage } = useUserJoin();
  const handleSubmit = async (e: { target: { id: string } }) => {
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
    mutation.mutate(memberInfo);
  };

  return (
    <Layout>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          className="absolute top-[620px] left-[100px]"
        />
      )}
      <SelectKeyword
        handleSubmit={handleSubmit}
        setKeywordList={setKeywordList}
        keywordList={keywordList}
      />
    </Layout>
  );
}
