import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialProfilesState = {
  notifications: [],
  showNotification: () => {},
};

const profilesSlice = createSlice({
  name: "profile",
  initialState: initialProfilesState,
  reducers: {
    showNotification(state, action) {
      state.notifications = [
        ...state.notifications,
        {
          id: v4(),
          type: action.payload.type,
          message: action.payload.message,
        },
      ];
    },
    removeNotification(state, action) {
      const id = action.payload.id;
      const updatedNotification = state.notifications.filter(
        (notification) => notification.id !== id
      );
      state.notifications = updatedNotification;
    },
  },
});

export const profilesActions = profilesSlice.actions;

export default profilesSlice.reducer;
