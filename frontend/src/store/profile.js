import { createSlice } from "@reduxjs/toolkit";

const initialProfilesState = {
  nfts: [],
};

const profilesSlice = createSlice({
  name: "profile",
  initialState: initialProfilesState,
  reducers: {
    addNftsData(state, action) {
      state.nfts = action.payload.nftsData || [];
    },
  },
});

export const profilesActions = profilesSlice.actions;

export default profilesSlice.reducer;
