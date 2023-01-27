import instance from '@apis/_axios/instance';
import { CustomizeArtwork } from './homeApi.type';

export class HomeApi {
  async getCustomizedArtWork(): Promise<CustomizeArtwork> {
    const { data } = await instance(
      '/members/customized-artworks?page=1&limit=5',
    );
    return data;
  }
}

const homeApi = new HomeApi();

export default homeApi;
