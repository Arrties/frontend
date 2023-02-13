export interface InquiryForm {
  date: string;
  time: string;
  title: string;
  content: string;
  status: string;
  answer: string;
  id: number;
}
export interface KeywordForm {
  keywords: string[];
}

export interface Keyword {
  id: number;
  keyword: string;
}

export interface Notice {
  data: number;
  details: string;
  id: number;
  message: string;
  modifiedDate: string;
  title: string;
}
export interface IsNoticeForm {
  newNotification: boolean;
  isArtist: boolean;
}
export interface Role {
  roles: string;
}
