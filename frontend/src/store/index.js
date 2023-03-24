// import { createStore } from "redux";

import { configureStore } from "@reduxjs/toolkit";

import dealsReducer from "./deals";

const store = configureStore({
  reducer: { deals: dealsReducer },
});

export default store;
