import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface Participant {
  id: string;
  surname: string;
  name: string;
  middleName: string;
  city: string;
  birthday: string;
  email: string;
  phone: string;
  distance: number;
  hasPayment: boolean;
}

interface ParticipantsState {
  participants: Participant[];
}

const initialState: ParticipantsState = {
  participants: [],
};

const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    setParticipants: (state, action: PayloadAction<Participant[]>) => {
      state.participants = action.payload;
    },
    addParticipant: (state, action: PayloadAction<Participant>) => {
      state.participants.push(action.payload);
    },
    deleteParticipant: (state, action: PayloadAction<number>) => {
      state.participants = state.participants.filter(
        (participant) => participant.id !== action.payload
      );
    },
    updateParticipant: (state, action: PayloadAction<Participant>) => {
      const index = state.participants.findIndex(
        (participant) => participant.id === action.payload.id
      );
      if (index !== -1) {
        state.participants[index] = action.payload;
      }
    },
  },
});

export const {
  setParticipants,
  addParticipant,
  deleteParticipant,
  updateParticipant,
} = participantsSlice.actions;

export const selectParticipants = (state: RootState) =>
  state.participants.participants;

export default participantsSlice.reducer;
