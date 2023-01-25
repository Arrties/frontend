export type ChatDTOType = {
  artistId: number;
  artWorkId: number;
};
export type ChatParamPutType = {
  id: string;
  data: ChatDTOType;
};
export type ChatParamPatchType = {
  id: string;
  data: Partial<ChatDTOType>;
};

export type ChatRoomDTOType = {
  chatRoomId: number;
  artWorkImage: string;
  unreadCount: number;
  otherMember: {
    id: number;
    name: string;
    image: string;
  };
  lastMessage: {
    message: string;
    sendDate: string;
  };
};
