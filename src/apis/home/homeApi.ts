import instance from '@apis/_axios/instance';

export class HomeApi {
  async getKeywordArtWork(): Promise<any> {
    const { data } = await instance(
      '/members/customized-artworks?page=1&limit=5',
    );
    return data;
  }
}

const homeApi = new HomeApi();

export default homeApi;
