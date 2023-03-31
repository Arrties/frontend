import profileApi from '@apis/profile/profileApi';
import { IsNoticeForm } from '@apis/profile/profileApi.type';
import { useQuery } from '@tanstack/react-query';

const useGetIsNotice = () => {
  return useQuery<IsNoticeForm, Error>(['useGetIsNotice'], () =>
    profileApi.getIsNotice(),
  );
};

export default useGetIsNotice;
