export interface InquiryForm {
  date: string;
  time: string;
  title: string;
  content: string;
  status: string;
  answer: string;
  id: number;
}
export interface RoleForm {
  roles: string;
}
export interface KeywordForm {
  keywords: string[];
}

export interface Keyword {
  id: number;
  keyword: string;
}

export interface NoticeForm {
  id: number;
  title: string;
  message: string;
  createdDate: string;
  link: string;
}
