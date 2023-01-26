import { ArtworkDTOType } from './artworkApi.type';
import instance from '@apis/_axios/instance';

export class ArtworkApi {
  async postArtwork(body: FormData): Promise<ArtworkDTOType> {
    const { data } = await instance.post('/art-works', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }
  async getDetail(artWorkId: number) {
    const { data } = await instance.get(`art-works/${artWorkId}`);
    return data;
  }
}

const artworkApi = new ArtworkApi();

export default artworkApi;
