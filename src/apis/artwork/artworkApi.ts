import { getToken } from './../../utils/localStorage/token/index';
import { ArtworkDTOType } from './artworkApi.type';
import axios from 'axios';
export class ArtworkApi {
  async postArtwork(body: FormData): Promise<ArtworkDTOType> {
    try {
      const token = getToken();
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/art-works`,
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token.accessToken,
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
