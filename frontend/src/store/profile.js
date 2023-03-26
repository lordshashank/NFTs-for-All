import { createSlice } from "@reduxjs/toolkit";

const initialProfilesState = {
  nfts: [],
  fractionalNfts: [],
  contracts: [],
};

const profilesSlice = createSlice({
  name: "profile",
  initialState: initialProfilesState,
  reducers: {
    addNftsData(state, action) {
      state.nfts = action.payload.nftsData || [];
    },
    addFractionalData(state, action) {
      state.fractionalNfts = action.payload.fractionalData || [];
    },
    addContract(state, action) {
      state.contracts = action.payload.nftsData || [];
      console.log(action.payload.nftsData);
      console.log(state.contracts);
    },
  },
});

export const profilesActions = profilesSlice.actions;

export default profilesSlice.reducer;
