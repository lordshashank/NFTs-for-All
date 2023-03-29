import { createSlice } from "@reduxjs/toolkit";

const initialbuyNowState = {
  isOpen: false,
  content: undefined,
};

const buyNowSlice = createSlice({
  name: "profile",
  initialState: initialbuyNowState,
  reducers: {
    onPresent(state, action) {
      state.content = action.payload.content;
      state.isOpen = true;
    },
    onDismiss(state) {
      state.isOpen = false;
      state.content = undefined;
    },
  },
});

export const buyNowActions = buyNowSlice.actions;

export default buyNowSlice.reducer;
