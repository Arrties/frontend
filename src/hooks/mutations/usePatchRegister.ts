import profileApi from '@apis/profile/profileApi';
import { useMutation } from '@tanstack/react-query';

const usePatchResgister = () => {
  return useMutation(['usePatchResgister'], (formData: FormData) =>
    profileApi.patchProfile(formData),
  );
};
export default usePatchResgister;
