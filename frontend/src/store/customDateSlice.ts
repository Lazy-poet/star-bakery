import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleRange } from "./timeRangeSlice";
type InitialState = {
  custom: boolean;
  date: [Date, Date];
};
const initialState = {
  date: [new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()],
  custom: false,
} as InitialState;

const customDateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    toggleCustomDate: (state, action: PayloadAction<InitialState["date"]>) => {
      state.date = action.payload;
      state.custom = true;
    },
    setIsCustom: (state, action: PayloadAction<boolean>) => {
      state.custom = action.payload;
    },
  },
});

export const { toggleCustomDate, setIsCustom } = customDateSlice.actions;
export default customDateSlice.reducer;
