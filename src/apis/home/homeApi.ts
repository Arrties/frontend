import instance from '@apis/_axios/instance';

import { CustomizeArtwork } from './homeApi.type';

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
}

const homeApi = new HomeApi();

export default homeApi;
