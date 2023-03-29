// import { createStore } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

import dealsReducer from "./deals";
import notificationReducer from "./notification";
import buyNowReducer from "./buyNow";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: {
    deals: dealsReducer,
    notification: notificationReducer,
    buyNow: buyNowReducer,
  },
  middleware: customizedMiddleware,
});

export default store;
