import { FC } from 'react'
import { Range, } from 'store/timeRangeSlice'
import { Order, OrderType } from 'store/orderSlice'
import useCustomSelector from 'hooks/useCustomSelector'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend
);



const filterLablelData = (data: Order[], timeRange: { label: string, timestamp: number }[], rangeType: Range) => {
  switch (rangeType) {
    case Range.HOURLY:
    case Range.DAILY:
      return timeRange.map(time => data.filter(d => new Date(d.updated_at).getTime() === time.timestamp).length)
  }
}

const Chart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        position: 'bottom' as const,
        text: 'Value of orders over time',
      },
      zoom: {
        zoom: {
          enabled: true,
          mode: 'xy' as const,
        },
        pan: {
          enabled: true,
          mode: 'xy' as const,
        }

      },
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amount'
        },
        // stacked: true,

      },
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time'
        },
        barThickness: 'flex',
        maxBarThickness: 200,
        gridLines: {
          display: false
        },
        // stacked: true,

        ticks: {
          beginAtZero: true,
          stepSize: 1,
          maxTicksLimit: 12,
          major: {
            enabled: true
          },
          type: 'time',
          ticks: {
            source: 'data'
          },
          time: {
            unit: "minute"
          },
          color: (context: any) => context.tick && context.tick.major && '#FF0000',
          font: function (context: any) {
            if (context.tick && context.tick.major) {
              return {
                weight: 'bold'
              };
            }
          }

        }
      }
    }
  };

  const timeRangeType = useCustomSelector(state => state.timeRange.range);
  const timeRangeValues = useCustomSelector(state => state.timeRange.values);
  const filteredOrders = useCustomSelector(state => state.orders.filteredOrders);
  const backgroundColors = ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)', 'rgba(75, 192, 192, 1)']
  const typeFilteredOrders = useCustomSelector(state => state.orders.defaultChartData.orderTypeChart);
  const data = {
    labels: timeRangeValues.map(v => v.label),
    datasets: (Object.keys(typeFilteredOrders) as OrderType[]).map((type, i) => ({
      fill: true,
      label: type,
      data: typeFilteredOrders[type],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: backgroundColors[i],
    }))

  };

  return <Bar options={options} data={data} />

}
export default Chart;