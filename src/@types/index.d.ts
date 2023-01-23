interface Artwork {
  image: string[];
  guaranteeImage: string;
  title: string;
  keywords: string[];
  productionYear: number;
  material: string;
  size: string;
  price: number;
  status: string;
  statusDescription: string;
  frame: boolean;
  genre: string;
  description: string;
  length: number;
  width: number;
  height: number;
}

interface Member extends User, Artist {
  keywords?: string[];
}

interface User {
  userId: string;
  password: string;
  email?: string;
  nickname?: string;
  telephone?: string;
  image?: any;
}

interface Artist {
  education?: string;
  history?: string;
  description?: string;
  instagram?: string;
  behance?: string;
}
