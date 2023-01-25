import profileApi from '@apis/profile/profileApi';
import Layout from '@components/common/Layout';
import SelectKeyword from '@components/profile/Selectkeyword';
import useGetProfile from '@hooks/queries/useGetProfile';
import { useState, useEffect } from 'react';

export default function Keyword() {
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const { data } = useGetProfile();

  useEffect(() => {
    setKeywordList(data?.keywords || []);
  }, [data]);

  const handleSubmit = async (e: any) => {
    let response: any;
    if (e.target.id === 'skip') {
      response = await profileApi.patchKeyword(data?.keywords || []);
    } else {
      response = await profileApi.patchKeyword(keywordList);
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
