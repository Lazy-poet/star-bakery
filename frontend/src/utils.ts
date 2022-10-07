import { Range } from "./store/timeRangeSlice";
import { Order, ChartType } from "./store/orderSlice";
import isSameMinute from "date-fns/isSameMinute";
import isSameHour from "date-fns/isSameHour";
import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";

const getFilterFunction = (rangeType: Range) => {
  switch (rangeType) {
    case Range.HOURLY:
    case Range.DAILY:
      return isSameMinute;
    case Range.WEEKLY:
      return isSameDay;
    case Range.MONTHLY:
      return isSameDay;
    case Range.YEARLY:
      return isSameMonth;
    default:
      return isSameMinute;
  }
};

export const filterLabelData = (
  data: Order[],
  timeRange: { label: string; timestamp: number }[],
  rangeType: Range,
  chartType: ChartType
) => {
  const filterFunction = getFilterFunction(rangeType);
  switch (chartType) {
    case "orderNumbersChart":
    case "orderTypeChart":
    case "orderStateChart":
      return timeRange.map(
        (time) =>
          data.filter((d) =>
            filterFunction(new Date(d.updated_at), new Date(time.timestamp))
          ).length
      );
    case "orderValueChart":
      return timeRange.map((time) =>
        data
          .filter((order) =>
            filterFunction(new Date(order.updated_at), new Date(time.timestamp))
          )
          .reduce((acc: number, item: Order) => (acc += item.amount), 0)
      );
    //   case "orderTypeChart":
  }
  return [];
};
