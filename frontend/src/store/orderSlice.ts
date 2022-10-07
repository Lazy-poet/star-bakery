import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleRange, Range, defaultValues } from "./timeRangeSlice";
import { toggleCustomDate } from "./customDateSlice";
import { filterLabelData } from "utils";
export interface Order {
  order_item: string;
  state: string;
  order_id: number;
  branch_id: number;
  customer_id: number;
  created_at: number;
  updated_at: number;
  amount: number;
}
export type ChartType =
  | "orderNumbersChart"
  | "orderValueChart"
  | "orderStateChart"
  | "orderTypeChart";

export type OrderState = "created" | "shipped" | "delivered" | "cancelled";
export type OrderType = "muffins" | "cake" | "cookies";
type InitialState = {
  orders: Order[];
  filteredOrders: Order[];
  defaultChartData: {
    orderNumbersChart: number[];
    orderValueChart: number[];
    orderStateChart: Record<OrderState, number[]>;
    orderTypeChart: Record<OrderType, number[]>;
  };
};
const initialState = {
  orders: [],
  filteredOrders: [],
  defaultChartData: {
    orderNumbersChart: [],
    orderValueChart: [],
    orderStateChart: {
      created: [],
      shipped: [],
      delivered: [],
      cancelled: [],
    },
    orderTypeChart: {
      cake: [],
      muffins: [],
      cookies: [],
    },
  },
} as InitialState;

const filterOrdersByDate = (date: Date[], orders: Order[]) => {
  const startDate = new Date(date[0])?.getTime() || Date.now();
  const endDate = new Date(date[1])?.getTime() || Date.now();
  const range = limits.find((l) => l > endDate - startDate);
  return filterOrders(orders, startDate, endDate);
};
export const limits = [
  60 * 60 * 1000,
  24 * 60 * 60 * 1000,
  7 * 24 * 60 * 60 * 1000,
  30 * 24 * 60 * 60 * 1000,
  12 * 30 * 24 * 60 * 60 * 1000,
];

const getLimitsRange = (
  range: Range,
  dates: [Date, Date] = [new Date(), new Date()]
): [number, number] => {
  switch (range) {
    case Range.HOURLY:
    case Range.DAILY:
    case Range.WEEKLY:
    case Range.MONTHLY:
    case Range.YEARLY:
      return [Date.now() - limits[range], Date.now()];
    case Range.CUSTOM:
      return [new Date(dates[0]).getTime(), new Date(dates[1]).getTime()];
  }
};
const filterOrders = (orders: Order[], start: number, end: number) => {
  // let limit = limits[range];
  return orders.filter(
    (order) =>
      new Date(order.updated_at).getTime() >= start &&
      new Date(order.updated_at).getTime() <= end
  );
};

const setChartsData = (
  state: InitialState,
  range: Range,
  filteredOrders: Order[]
) => {
  return {
    orderNumbersChart: filterLabelData(
      filteredOrders,
      defaultValues[range],
      range,
      "orderNumbersChart"
    ),
    orderValueChart: filterLabelData(
      filteredOrders,
      defaultValues[range],
      range,
      "orderValueChart"
    ),
    orderStateChart: (
      Object.keys(state.defaultChartData.orderStateChart) as OrderState[]
    ).reduce((obj, key) => {
      obj[key] = filterLabelData(
        filteredOrders.filter((order) => order.state === key),
        defaultValues[range],
        range,
        "orderStateChart"
      );
      return obj;
    }, {} as Record<OrderState, number[]>),
    orderTypeChart: (
      Object.keys(state.defaultChartData.orderTypeChart) as OrderType[]
    ).reduce((obj, key) => {
      obj[key] = filterLabelData(
        filteredOrders.filter((order) => order.order_item === key),
        defaultValues[range],
        range,
        "orderTypeChart"
      );
      return obj;
    }, {} as Record<OrderType, number[]>),
  };
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    fetchOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.filteredOrders = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(toggleRange, (state, action) => {
        const filteredOrders = filterOrders(
          state.orders,
          ...getLimitsRange(action.payload)
        );
        state.filteredOrders = filteredOrders;
        state.defaultChartData = setChartsData(
          state,
          action.payload,
          filteredOrders
        );
      })
      .addCase(toggleCustomDate, (state, action) => {
        const filteredOrders = filterOrders(
          state.orders,
          ...getLimitsRange(Range.CUSTOM, action.payload)
        );
        state.filteredOrders = filteredOrders;
        state.defaultChartData = setChartsData(
          state,
          action.payload,
          filteredOrders
        );
      })
});

export const { fetchOrders } = orderSlice.actions;
export default orderSlice.reducer;
