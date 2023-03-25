// import { createStore } from "redux";

import { configureStore } from "@reduxjs/toolkit";

import dealsReducer from "./deals";
import profilesReducer from "./profile";

const store = configureStore({
  reducer: { deals: dealsReducer, profile: profilesReducer },
});

export default store;
