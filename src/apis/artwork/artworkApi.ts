import instance from '@apis/_axios/instance';

export class ArtworkApi {
  async postArtwork(body: FormData): Promise<any> {
    const { data } = await instance.post('/art-works', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }
  async getDetail(artWorkId: number): Promise<ArtworkDetail> {
    const { data } = await instance.get(`art-works/${artWorkId}`);
    return data;
  }
  async postPrefer(artWorkId: number) {
    await instance.post(`/members/preferred-artists/${artWorkId}`);
  }
  async deletePrefer(artWorkId: number) {
    await instance.delete(`/members/preferred-artists/${artWorkId}`);
  }
  async getExhibitionList() {
    const { data } = await instance.get('/exhibit');
    return data;
  }

  async getExhibitionItemList(auctionId: number) {
    const { data } = await instance.get(`/exhibit/${auctionId}`);
    return data;
  }

  async getExhibitionItem(artworkId: number): Promise<ExhibitionArtWork> {
    const { data } = await instance.get(`/exhibit/art-works/${artworkId}`);
    return data;
  }
  async getBid(): Promise<BidArtwork> {
    const { data } = await instance.get('/art-works/bidding/me');
    return data;
  }
}

const artworkApi = new ArtworkApi();

export default artworkApi;
