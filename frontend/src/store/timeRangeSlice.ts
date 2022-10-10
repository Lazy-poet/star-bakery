import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleCustomDate } from "./customDateSlice";
import { limits } from "./orderSlice";
export enum Range {
  HOURLY,
  DAILY,
  WEEKLY,
  MONTHLY,
  YEARLY,
  CUSTOM,
}
type InitialState = {
  range: Range;
  values: { label: string; timestamp: number }[];
  defaultValues: { label: string; timestamp: number }[][];
};

/**
 * 
 * @param interval time interval in mins

 * @param limit entire duration in minutes
 * @param currentTime 
 * @returns 
 */
const getIntervalTimes = (
  interval: number,
  limit: number,
  currentTime: number
) => {
  let times = [];
  let j = 0;
  while (j <= Math.round(limit / interval)) {
    const timestamp = currentTime - interval * 60 * 1000 * j;
    var label = new Date(timestamp).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    times.unshift({ timestamp, label });
    j++;
  }
  return times;
};
/**
 *
 * @param interval interval in days
 * @param limit limit in days
 * @param currentTime
 */
const getIntervalDays = (
  interval: number,
  limit: number,
  currentTime: number
) => {
  const days = [];
  let j = 0;
  while (j <= limit) {
    const timestamp = currentTime - 24 * 60 * 60 * 1000 * j;
    const time = new Date(timestamp);

    const label = time.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
    days.unshift({ timestamp, label });
    j += interval;
  }
  return days;
};
const getIntervalMonths = (
  interval: number,
  limit: number,
  currentTime: number
) => {
  const months = [];
  let j = 0;
  while (j <= limit) {
    const timestamp = currentTime - 24 * 60 * 60 * 1000 * j;
    const time = new Date(timestamp);

    const label = time.toLocaleString("en-US", {
      month: "short",
      year: "2-digit",
    });
    months.unshift({ timestamp, label });
    j += interval;
  }
  return months;
};

export const getMatchingRangeForCustomDate = (difference: number) => {
  const rangeIndex = limits.findIndex((limit) => limit >= difference);
  return rangeIndex > -1 ? rangeIndex : Range.YEARLY;
};
export const getCustomDateValues = (start: number, end: number) => {
  const difference = end - start;
  const range = getMatchingRangeForCustomDate(difference);
  console.log('matching range', range)
  switch (range) {
    case Range.HOURLY:
    case Range.DAILY:
      return getStateValues(range, Math.round(difference / 1000 / 60), end);
    default:
      return getStateValues(range, Math.round(difference / 1000 / 60 / 60 / 24), end);
  }
};
const getStateValues = (
  range: Omit<Range, "CUSTOM">,
  limit?: number,
  currentTime?: number
) => {
  switch (range) {
    case Range.HOURLY:
      return getIntervalTimes(1, limit || 60, currentTime || Date.now());
    case Range.DAILY:
      return getIntervalTimes(1, limit || 1440, currentTime || Date.now());
    case Range.WEEKLY:
      return getIntervalDays(1, limit || 7, currentTime || Date.now());
    case Range.MONTHLY:
      return getIntervalDays(1, limit || 30, currentTime || Date.now());
    case Range.YEARLY:
      return getIntervalMonths(30, limit || 365, currentTime || Date.now());
    default:
      return getIntervalTimes(1, limit || 1440, currentTime || Date.now());
  }
};
export const defaultValues = Array.from(Array(5).keys()).map(
  (entry) => getStateValues(entry)!
);
const initialState = {
  range: Range.HOURLY,
  values: getStateValues(Range.HOURLY),
  defaultValues,
} as InitialState;

const timeRangeSlice = createSlice({
  name: "range",
  initialState,
  reducers: {
    toggleRange: (state, action: PayloadAction<Range>) => {
      state.range = action.payload;
      if (action.payload !== Range.CUSTOM) {
        state.values = state.defaultValues[action.payload];
      }
    },
  },
  extraReducers: (builder) =>
    builder.addCase(toggleCustomDate, (state, action) => {
      state.range = Range.CUSTOM;
      state.values = getCustomDateValues(
        ...(action.payload.map((date) => new Date(date).getTime()) as [
          number,
          number
        ])
      )!;
    }),
});

export const { toggleRange } = timeRangeSlice.actions;
export default timeRangeSlice.reducer;
