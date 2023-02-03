interface artistDetail {
  artworks: {
    id: number;
    image: string;
    saleStatus: string;
    title: string;
  }[];
  member: {
    behance: string;
    description: string;
    education: string;
    history: string;
    id: number;
    image: string;
    instagram: string;
    nickname: string;
  };
  pick: boolean;
}
