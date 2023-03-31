import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from '@tanstack/react-query';

const useGetEditForm = (id: number) => {
  return useQuery(['useGetEditForm', id], () => artworkApi.getEditForm(id), {});
};

export default useGetEditForm;
