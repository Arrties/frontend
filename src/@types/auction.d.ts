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

interface Bidding {
  id: number;
  memberName: string;
  price: number;
  date: string;
}

interface BiddingHistory {
  artWork: {
    id: number;
    title: string;
    artistName: string;
    genre: string;
    beginPrice: number;
    topPrice: number;
  };
  auction: {
    id: number;
    startDate: string;
    endDate: string;
  };
  biddingList: Bidding[];
  totalBiddingCount: number;
}
