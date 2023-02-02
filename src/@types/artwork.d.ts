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

interface WishArtwork {
  hot: boolean;
  id: number;
  image: string;
  price: number;
  status: string;
  title: string;
}
