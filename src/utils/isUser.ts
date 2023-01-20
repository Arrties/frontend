import { getToken } from '@utils/localStorage/token'

export const isUser = getToken().roles === 'ROLE_USER';
