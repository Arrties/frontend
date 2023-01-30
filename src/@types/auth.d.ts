interface Member extends User, Artist {
  keywords?: string[];
}

interface User {
  userId: string;
  password: string;
  email: string;
  nickname: string;
  telephone?: string;
  image?: any;
  id?: string;
}

interface Artist {
  education?: string;
  history?: string;
  description?: string;
  instagram?: string;
  behance?: string;
}

interface Login {
  userId: string;
  password: string;
}

interface DuplicateCheck {
  userId: string;
  email: string;
  nickname: string;
}
