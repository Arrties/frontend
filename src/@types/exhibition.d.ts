interface ExhibitionList {
  id: number;
  turn: number;
  startDate: string;
  endDate: string;
  artWorkCount: number;
  image: string;
  status: string;
}

interface ExhibitionArtWork {
  title: string;
  education: string;
  description: string;
  genre: string;
  image: string;
}
