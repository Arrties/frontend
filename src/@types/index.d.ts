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
interface KeywordArtwork {
  id: string;
  image: string;
  title: string;
  education: string;
  pick: boolean;
}

interface CustomizeArtwork {
  nextPage: boolean;

  artworks: KeywordArtwork[];
}
