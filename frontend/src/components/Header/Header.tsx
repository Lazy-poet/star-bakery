import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

type Props = {}

const Header = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div style={{
      width: '100vw',
      height: 60,
      background: '#5657ff',
      color: "#fff",
      fontSize: '1.3rem',
      padding: '10px 50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontWeight: 600
    }}><span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Star Bakery</span>
      {location.pathname !== '/create-order' && <span style={{ cursor: 'pointer' }} onClick={() => navigate('create-order')}>Create Order</span>}
    </div>
  )
}

export default Header