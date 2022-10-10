import { useEffect, useState } from 'react'
import { Range, toggleRange } from 'store/timeRangeSlice'
import { Order } from 'store/orderSlice'
import useCustomDispatch from 'hooks/useCustomDispatch'
import useCustomSelector from 'hooks/useCustomSelector'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios'
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const Chart = () => {
  const [branches, setBranches] = useState([] as { name: string, orders: number }[])
  useEffect(() => {
    (async () => {
      const { data: { data } } = await axios.get('http://localhost:4100/api/star-bakery/v1/branch/');
      setBranches(data.sort((a: typeof branches[0], b: typeof branches[0]) => b.orders - a.orders).slice(0, 5))
    })()
  }, [])

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
        text: 'Top 5 branches based on orders',
        fontSize: 16

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
  };

  const timeRangeType = useCustomSelector(state => state.timeRange.range);
  const timeRangeValues = useCustomSelector(state => state.timeRange.values);
  const filteredOrders = useCustomSelector(state => state.orders.filteredOrders);
  const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ]
  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ]
  const data = {
    labels: branches.map(b => b.name),
    datasets: [{
      data: branches.map(b => b.orders),
      borderColor: borderColors,
      backgroundColor: backgroundColors,
      borderWidth: 1,
      weight: 10
    }]
  };

  return <div style={{ maxWidth: 500, maxHeight: 500, margin: '20px auto' }}>
    {branches.length ? <Pie options={options} data={data} /> :
      <p>No data found </p>}
  </div>

}
export default Chart;