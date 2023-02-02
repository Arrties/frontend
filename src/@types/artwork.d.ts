interface Artwork {
  id: number;
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

interface ArtworkDetail {
  artist: {
    id: number;
    artistEducation: string;
    artistName: string;
    artistImage: string;
  };
  artWork: {
    id: number;
    title: string;
    productionYear: number;
    material: string;
    genre: string;
    frame: boolean;
    description: string;
    artWorkSize: {
      length: number;
      width: number;
      height: number;
      size: number;
    };
    guaranteeImage: string;
    mainImage: string;
    keywords: string[];
    images: string[];
  };
  endDate: string;
  preferred: boolean;
  turn: number;
}
