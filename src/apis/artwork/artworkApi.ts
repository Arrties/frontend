import { ArtworkDTOType } from './artworkApi.type';
import instance from '@apis/_axios/instance';

export class ArtworkApi {
  async postArtwork(body: FormData): Promise<ArtworkDTOType> {
    try {
      const { data } = await instance.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/art-works`,
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return data;
    } catch (err: any) {
      return err;
    }
  }
}

const artworkApi = new ArtworkApi();

export default artworkApi;
