import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoticeState {
  isNotice: boolean;
}

const initialState: NoticeState = {
  isNotice: false,
};

const noticeSlice = createSlice({
  name: 'noticeReducer',
  initialState,
  reducers: {
    setNotice: (state: NoticeState, action: PayloadAction<{ isNotice }>) => ({
      ...state,
      isNotice: action.payload.isNotice,
    }),
  },
});

export const { setNotice } = noticeSlice.actions;

export default noticeSlice.reducer;
