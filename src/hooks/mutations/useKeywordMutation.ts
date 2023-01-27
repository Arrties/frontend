import profileApi from '@apis/profile/profileApi';
import { Keyword, KeywordForm } from '@apis/profile/profileApi.type';
import { useMutation } from 'react-query';

const useKeywordMutation = () => {
  return useMutation<Keyword[], Error, KeywordForm>(
    'useKeywordMuation',
    (data) => profileApi.patchKeyword(data),
  );
};
export default useKeywordMutation;
