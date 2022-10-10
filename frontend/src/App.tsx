import { useEffect, } from 'react'
import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import LoginOrSignup from './components/LoginOrSignup/LoginOrSignup'
import TimeSelector from './components/TimeSelector/TimeSelector'
import useCustomDispatch from 'hooks/useCustomDispatch'
import axios from 'axios'
import { fetchOrders } from './store/orderSlice'
import { toggleRange, Range } from 'store/timeRangeSlice'
import CreateOrder from 'components/CreateOrder/CreateOrder'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const dispatch = useCustomDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data: { data } } = await axios.get('http://localhost:4100/api/star-bakery/v1/order/', {
          headers: { 'Accept': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzlmNDk1NDI3ZWVlZDhjYWFjZTUyOCIsImlhdCI6MTY2NDc0Njc4NiwiZXhwIjoxNjY1MzUxNTg2fQ.w56Y09qnZ6I-cdIujB9fpMmmPnT4hRKWFqc_NEfczOc' }
        })
        dispatch(fetchOrders(data));

        dispatch(toggleRange(Range.HOURLY))
      }
      catch (e: any) {
        console.log(e.message)
      }
    })()

  }, [])
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<><TimeSelector />
          <Dashboard /> </>} />
        <Route path="auth" element={<LoginOrSignup />} />
        <Route path="create-order" element={<CreateOrder />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
