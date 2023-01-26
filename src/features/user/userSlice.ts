import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState extends User, Artist {
  isApproveSMSPromotion: boolean;
  isApproveEmailPromotion: boolean;
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

  isApproveSMSPromotion: false,
  isApproveEmailPromotion: false,
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
    setIsApproveSMSPromotion: (
      state: UserState,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      isApproveSMSPromotion: action.payload,
    }),
    setIsApproveEmailPromotion: (
      state: UserState,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      isApproveEmailPromotion: action.payload,
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
  setIsApproveSMSPromotion,
  setIsApproveEmailPromotion,
  setArtistInfo,
  setIsArtist,
} = userSlice.actions;

export default userSlice.reducer;
