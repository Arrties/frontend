import adminApi from '@apis/admin/admin';
import { useQuery } from 'react-query';

export default function useGetAsk() {
  return useQuery('useGetAsk', () => adminApi.getAsk());
}
