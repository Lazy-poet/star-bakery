import { useEffect } from 'react'
import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import TimeSelector from './components/TimeSelector/TimeSelector'
import useCustomDispatch from 'hooks/useCustomDispatch'
import useCustomSelector from 'hooks/useCustomSelector'
import axios from 'axios'
import { fetchOrders } from './store/orderSlice'
import { toggleRange, Range } from 'store/timeRangeSlice'

function App() {
  const dispatch = useCustomDispatch();

  useEffect(() => {
    (async () => {
      console.log('loaded axios')
      try {
        const { data: { data } } = await axios.get('http://localhost:4100/api/star-bakery/v1/orders/', {
          headers: { 'Accept': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzlmNDk1NDI3ZWVlZDhjYWFjZTUyOCIsImlhdCI6MTY2NDc0Njc4NiwiZXhwIjoxNjY1MzUxNTg2fQ.w56Y09qnZ6I-cdIujB9fpMmmPnT4hRKWFqc_NEfczOc'}
        })
        dispatch(fetchOrders(data));
      }
      catch (e: any) {
        console.log(e.message)
      }
    })()
    dispatch(toggleRange(Range.HOURLY))
  }, [])

  return (
    <div>
      <Header />
      <TimeSelector />
      <Dashboard />
    </div>
  )
}

export default App
