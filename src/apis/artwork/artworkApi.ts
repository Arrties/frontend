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
    await instance.post(`/members/preferred-artworks/${artWorkId}`);
  }
  async postDeletePrefer(artWorkId: number) {
    await instance.delete(`/members/preferred-artworks/${artWorkId}`);
  }
}

const artworkApi = new ArtworkApi();

export default artworkApi;
