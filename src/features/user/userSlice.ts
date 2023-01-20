import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState extends User, Artist {
  isApprovePromotion: boolean;
  isArtist: boolean;
  keywords: string[]; //user
}

const initialState: UserState = {
  userId: '',
  password: '',
  email: '',
  nickname: '',
  telephone: '',

  keywords: [], //user

  education: '', //artist
  history: '',
  description: '',
  instagram: '',
  behance: '',

  isApprovePromotion: false,
  isArtist: false,
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUserInfo: (state: UserState, action: PayloadAction<User>) => ({
      ...state,
      userId: action.payload.userId,
      password: action.payload.password,
      email: action.payload.email,
      nickname: action.payload.nickname,
      telephone: action.payload.telephone,
    }),
    setKeywords: (state: UserState, action: PayloadAction<string[]>) => ({
      ...state,
      keywords: action.payload,
    }),
    setArtistInfo: (state: UserState, action: PayloadAction<Artist>) => ({
      ...state,
      education: action.payload.education,
      history: action.payload.history,
      description: action.payload.description,
      instagram: action.payload.instagram,
      behance: action.payload.behance,
    }),
    setIsApprovePromotion: (
      state: UserState,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      isApprovePromotion: action.payload,
    }),
    setIsArtist: (state: UserState, action: PayloadAction<boolean>) => ({
      ...state,
      isArtist: action.payload,
    }),
  },
});

export const {
  setUserInfo,
  setKeywords,
  setIsApprovePromotion,
  setArtistInfo,
  setIsArtist,
} = userSlice.actions;

export default userSlice.reducer;
