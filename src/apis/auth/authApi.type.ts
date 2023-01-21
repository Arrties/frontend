import { Member } from 'types/user'

export type AuthDTOType = Member;
export type AuthParamGetType = {};
export type AuthParamPutType = {
  id: string;
  data: AuthDTOType;
};
export type AuthParamPatchType = {
  id: string;
  data: Partial<AuthDTOType>;
};
