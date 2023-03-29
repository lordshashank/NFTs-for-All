import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialNotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "profile",
  initialState: initialNotificationState,
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

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
