import Layout from '@components/common/Layout';
import { useState } from 'react';
import SelectKeyword from '@components/profile/Selectkeyword';
import authApi from '@apis/auth/authApi';

export default function Keyword() {
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const handleSubmit = async (e: { target: { id: string } }) => {
    const formData = new FormData();
    if (e.target.id === 'skip') {
      formData.append('keywords', JSON.stringify([]));
    } else {
      formData.append('keywords', JSON.stringify(keywordList));
    }
    const res = await authApi.patchUserInfo(formData);
  };
  return (
    <Layout>
      <SelectKeyword
        handleSubmit={handleSubmit}
        setKeywordList={setKeywordList}
        keywordList={keywordList}
      />
    </Layout>
  );
}
