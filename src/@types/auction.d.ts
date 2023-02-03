interface Auction {
  id: number;
  turn: number;
  startDate: string;
  endDate: string;
  status: string;
}

interface ArtworkSize {
  width: number;
  length: number;
  height: number;
  size: number;
}

interface NowAuctionArtwork {
  id: number;
  mainImage: string;
  title: string;
  artWorkSize: ArtworkSize;
  productionYear: number;
  topPrice: number;
  material: string;
}

interface LastAutionArtwork extends NowAuctionArtwork {
  status: string;
  material: string;
  bindingCount: number;
}

interface NowAuctionArtworkList {
  turn: number;
  endDate: string;
  artWorkList: NowAuctionArtwork[];
}

interface LastAuctionArtworkList {
  nextPage: boolean;
  artWorks: LastAutionArtwork[];
}

interface AuctionList {
  artWorkCount: number;
  endDate: string;
  id: number;
  image: string;
  startDate: string;
  status: string;
  turn: number;
}
