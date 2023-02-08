interface Notice {
  data: number;
  details: string;
  id: number;
  message: string;
  modifiedDate: string;
  title: string;
}

interface Inquiry {
  id: number;
  title: string;
  content: string;
  answer: string | null;
  status: string;
  date: string;
}
