import { createSlice } from "@reduxjs/toolkit";
import { contractAddress } from "../../constants";

const initialDealsState = {
  nftsData: [],
  passData: [],
  fractionalData: [
    {
      contract: {
        name: "CRICKET",
        symbol: "ICC",
        address: contractAddress.nft,
      },
      rawMetaData: {
        image: "ipfs://QmQj3M4JvGdNXXvcU1X5aid4ihnSwQeBP5pYbCR1WosHa3",
        name: "Virat Kohli",
        description:
          "Virat Kohli, modern day master, undoubtedly one of the greatest batsman of this era. His records speak for themselves. He is one of the few players in the world who can change the course of a game with his bat in any format at any day. This is the NFT of Virat Kohli in red, i.e. in colors of RCB, the team he admires a lot and has given his best for. He holds record of highest score in an IPL season in these colors only. Hurry up to grab this NFT before it's too late.",
      },
      tokenId: 1,
      partsAvailable: 1000,
      isNoLoader: true,
    },
  ],
  fractionalDataB: [],
  contracts: [],
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
      state.fractionalDataB = action.payload.fractionalData || [];
    },
    // addFileName(state, action) {
    //   state.fileName = action.payload.fileName;
    // },
  },
});

export const dealsActions = dealsSlice.actions;

export default dealsSlice.reducer;
