interface Error {
  code: string;
  detail: string;
  error: string;
  status: number;
}

interface defaultProps {
  [key: string]: any;
}

// customize artwork
interface Artwork {
  id: string;
  image: string;
  title: string;
  education: string;
}

interface CustomizeArtwork {
  nextPage: boolean;
  artworks: Artwork[];
}
