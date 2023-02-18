import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from 'react-query';

const useGetEditForm = (id: number) => {
  return useQuery('useGetEditForm', () => artworkApi.getEditForm(id), {
    retry: false,
  });
};

export default useGetEditForm;
