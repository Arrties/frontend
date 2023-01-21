import authApi from '@apis/auth/authApi'
import Layout from '@components/common/Layout'
import Modal from '@components/common/Modal'
import SelectKeyword from '@components/common/Selectkeyword'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Keyword() {
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const handleSubmit = async (e: { target: { id: string } }) => {
    const formData = new FormData();
    if (e.target.id === 'skip') {
      formData.append('keywords', []);
    } else {
      formData.append('keywords', keywordList);
    }
    await authApi.patchUserInfo(formData);
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
