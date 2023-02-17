import profileApi from '@apis/profile/profileApi';
import { useMutation } from 'react-query';

const usePatchResgister = () => {
  return useMutation('usePatchResgister', (formData: FormData) =>
    profileApi.patchProfile(formData),
  );
};
export default usePatchResgister;
