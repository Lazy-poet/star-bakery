import React from 'react'

type Props = {}

const Header = (props: Props) => {
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
        fontWeight: 600
    }}>Star Bakery</div>
  )
}

export default Header