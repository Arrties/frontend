import instance from '@apis/_axios/instance';

export class HomeApi {
  async getCustomizedArtWork(
    page: number,
    limit: number,
  ): Promise<CustomizeArtwork> {
    const { data } = await instance(
      `/members/customized-artworks?page=${page}&limit=${limit}`,
    );
    return data;
  }
  async getAuctionList(): Promise<AuctionList[]> {
    const { data } = await instance('/auction');
    return data;
  }
}

const homeApi = new HomeApi();

export default homeApi;
