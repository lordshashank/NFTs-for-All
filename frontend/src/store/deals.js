import { createSlice } from "@reduxjs/toolkit";

const initialDealsState = {
  nftsData: [],
  passData: [],
  fractionalData: [],
  contracts: [],
  check: false,
  buyPrice: 0,
  profile: {
    url: "/logo.jpg",
    name: "Jenny Jimenez",
  },
};

const dealsSlice = createSlice({
  name: "deals",
  initialState: initialDealsState,
  reducers: {
    addNftsData(state, action) {
      state.nftsData = action.payload.nftsData || [];
    },
    addPassData(state, action) {
      const updatedData = action.payload.nftsData.map((data) => ({
        ...data,
        isToken: false,
      }));
      state.passData = updatedData || [];
    },
    reducePartsAvailable(state, action) {
      state.fractionalData[action.payload.tokenId - 1].partsAvailable =
        state.fractionalData[action.payload.tokenId - 1].partsAvailable -
        parseInt(action.payload.parts);
    },
    addContract(state, action) {
      state.contracts = action.payload.nftsData;
      console.log(action.payload.nftsData);
    },
    addFractionalData(state, action) {
      state.fractionalData = action.payload.fractionalData || [];
    },
    setCheck(state, action) {
      state.check = action.payload.value;
    },
    setBuyPrice(state, action) {
      state.buyPrice = action.payload.value;
    },
    updateProfile(state, action) {
      state.profile = action.payload.nftsData;
    },
  },
});

export const dealsActions = dealsSlice.actions;

export default dealsSlice.reducer;
