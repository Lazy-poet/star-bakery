import { FC } from 'react'
import { Range, toggleRange } from 'store/timeRangeSlice'
import { Order } from 'store/orderSlice'
import useCustomDispatch from 'hooks/useCustomDispatch'
import useCustomSelector from 'hooks/useCustomSelector'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ZoomPlugin from "chartjs-plugin-zoom";
import { MdZoomIn, MdZoomOut } from 'react-icons/md'
ChartJS.defaults.hover.intersect = false;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  ZoomPlugin
);




const OrdersNumberChart = () => {
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: true,
        position: 'bottom' as const,
        text: 'Number of orders over time',
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true // SET SCROOL ZOOM TO TRUE
          },
          pinch: {
            enabled: true
          },
          drag: {
            enabled: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            threshold: 100,

          },
          mode: "x" as const,
          // speed: 10
        },
        pan: {
          enabled: true,
          mode: "xy" as const,
          speed: 10
        }
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest" as const,
        intersect: true,
      },
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: 'Quantity'
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1

        }
      },
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time'
        },
        scaleLabel: {
          display: true,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 5,
          maxTicksLimit: 10,
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

  const timeRangeValues = useCustomSelector(state => state.timeRange.values);
  const labelData = useCustomSelector(state => state.orders.defaultChartData['orderNumbersChart'])

  // console.log('data', labelData1)
  const data = {
    labels: timeRangeValues.map(v => v.label),
    datasets: [
      {
        fill: true,
        label: 'Number of Orders',
        data: labelData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
        lineTension: .2,
        borderJoinStyle: "miter" as const,
        pointBorderWidth: .2,
        pointHoverRadius: 5,
        pointHoverBorderWidth: .5,
        pointHitRadius: 2,
        pointRadius: 1,
        pointBackgroundColor: "rgba(255, 99, 132, .5)",
      }
    ],

  };

  return <div style={{ position: 'relative' }}>
    <div style={{ display: 'flex', padding: '20px 0', gap: 10, color: '#444', alignItems: 'center', fontSize: '1.2rem' }}>
      {/* <MdZoomIn style={{ cursor: 'pointer' }} onClick={handleZoom}/> */}
      {/* <MdZoomOut style={{ cursor: 'pointer' }} onClick={handleZoom}/> */}
    </div>
    <Line options={options} data={data} />
    {!labelData.length && <div style={{
      position: 'absolute',
      fontSize: '12px',
      height: '100%',
      width: '100%',
      fontWeight: 400,
      color: "#222",
      top: 0,
      left: 0,
      display: 'grid',
      placeItems: 'center'
    }}>
      <p>No data available for selected time range</p>
    </div>}
  </div>

}

const OrdersValueChart = () => {
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: true,
        position: 'bottom' as const,
        text: 'Value of orders over time',
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true // SET SCROOL ZOOM TO TRUE
          },
          mode: "xy" as const,
          speed: 10
        },
        pan: {
          enabled: true,
          mode: "xy" as const,
          speed: 10
        }
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest" as const,
        intersect: true,
      },
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amount'
        },
        ticks: {
          beginAtZero: true,
          stepSize: 100

        }
      },
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time'
        },
        scaleLabel: {
          display: true,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 5,
          maxTicksLimit: 10,
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

  const timeRangeValues = useCustomSelector(state => state.timeRange.values);
  const labelData = useCustomSelector(state => state.orders.defaultChartData['orderValueChart'])
  const data = {
    labels: timeRangeValues.map(v => v.label),
    datasets: [
      {
        fill: true,
        label: 'Value of Orders in RS',
        data: labelData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
        lineTension: .2,
        borderJoinStyle: "miter" as const,
        pointBorderWidth: .2,
        pointHoverRadius: 5,
        pointHoverBorderWidth: .5,
        pointHitRadius: 2,
        pointRadius: 1,
        pointBackgroundColor: "rgba(255, 99, 132, .5)",
      }
    ],

  };

  return <div style={{ position: 'relative' }}>
    <Line options={options} data={data} />
    {!labelData.length && <div style={{
      position: 'absolute',
      fontSize: '12px',
      height: '100%',
      width: '100%',
      fontWeight: 400,
      color: "#222",
      top: 0,
      left: 0,
      display: 'grid',
      placeItems: 'center'
    }}>
      <p>No data available for selected time range</p>
    </div>}
  </div>

}
const OrdersChart = () => {

  return <div>

    <OrdersNumberChart />
    <br />
    <br />
    <OrdersValueChart />
  </div>
}
export default OrdersChart;