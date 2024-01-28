// store.ts
import { configureStore } from "@reduxjs/toolkit";
import participantsReducer, { setParticipants } from "../slice/participantsSlice";
import { participantsData } from "../data";

const store = configureStore({
  reducer: {
    participants: participantsReducer,
  },
});

store.dispatch(setParticipants(participantsData));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
