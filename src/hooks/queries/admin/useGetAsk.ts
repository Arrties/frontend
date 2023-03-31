import adminApi from '@apis/admin/admin';
import { useQuery } from '@tanstack/react-query';

export default function useGetAsk() {
  return useQuery(['useGetAsk'], () => adminApi.getAsk());
}
