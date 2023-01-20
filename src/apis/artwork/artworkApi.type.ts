import { Artwork } from 'types/artwork';

export type ArtworkDTOType = Artwork;
export type ArtworkParamGetType = {};
export type ArtworkParamPutType = {
  id: string;
  data: ArtworkDTOType;
};
export type ArtworkParamPatchType = {
  id: string;
  data: Partial<ArtworkDTOType>;
};
