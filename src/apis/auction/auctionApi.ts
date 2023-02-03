import instance from '@apis/_axios/instance';

export class AuctionApi {
  async getAuctionList(): Promise<Auction[]> {
    const { data } = await instance.get('/auction');
    return data;
  }

  async getNowAuctionArtworkList(): Promise<NowAuctionArtworkList> {
    const { data } = await instance.get('/auction/art-works');
    return data;
  }

  async getLastAuctionList(): Promise<Auction[]> {
    const { data } = await instance.get('/auction/period-over');
    return data;
  }

  async getLastAuctionArtworkList({
    auctionId,
    size,
    artWorkId,
  }): Promise<LastAuctionArtworkList> {
    const { data } = await instance.get(
      `/auction/period-over/${auctionId}?size=${size}&artWorkId=${artWorkId}`,
    );
    return data;
  }

  async getBiddingHistory(artWorkId: number): Promise<BiddingHistory> {
    const { data } = await instance.get(`/art-works/${artWorkId}/binding`);
    return data;
  }
}

const auctionApi = new AuctionApi();

export default auctionApi;
