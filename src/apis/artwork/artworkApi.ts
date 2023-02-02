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
    const response = await instance.post(
      `/members/preferred-artworks/${artWorkId}`,
    );
    return response;
  }
  async postDeletePrefer(artWorkId: number) {
    const response = await instance.delete(
      `/members/preferred-artworks/${artWorkId}`,
    );
    return response;
  }
}

const artworkApi = new ArtworkApi();

export default artworkApi;
