import profileApi from '@apis/profile/profileApi';
import { Keyword, KeywordForm } from '@apis/profile/profileApi.type';
import { useMutation } from '@tanstack/react-query';

const usePatchKeyword = () => {
  return useMutation<Keyword[], Error, KeywordForm>(
    ['useKeywordMuation'],
    (data) => profileApi.patchKeyword(data),
  );
};
export default usePatchKeyword;
