interface Artwork {
  id: string;
  image: string;
  title: string;
  education: string;
}

export interface CustomizeArtwork {
  nextPage: boolean;
  artworks: Artwork[];
}
