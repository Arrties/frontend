import adminApi from '@apis/admin/admin';
import { useQuery } from '@tanstack/react-query';

export default function useGetCertificationList() {
  return useQuery(['useCertificationList'], () =>
    adminApi.getCertificationList(),
  );
}
