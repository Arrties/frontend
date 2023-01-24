import authApi from '@apis/auth/authApi';
import Layout from '@components/common/Layout';
import SelectKeyword from '@components/profile/Selectkeyword';
import useGetProfile from '@hooks/queries/useGetProfile';
import { useState, useEffect } from 'react';

export default function Keyword() {
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const { userInfo } = useGetProfile();

  useEffect(() => {
    setKeywordList(userInfo?.keywords || []);
  }, [userInfo]);

  const handleSubmit = async (e: any) => {
    let response: any;
    if (e.target.id === 'skip') {
      response = await authApi.patchKeyword(userInfo?.keywords || []);
    } else {
      response = await authApi.patchKeyword(keywordList);
    }
    console.log(response);
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
