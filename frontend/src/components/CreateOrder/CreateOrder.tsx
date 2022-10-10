import axios from 'axios';
import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react'
import { useNavigate,  } from 'react-router-dom'

type Props = {}

const CreateOrder = (props: Props) => {
    const [branches, setBranches] = useState([] as { name: string, _id: string }[]);
    const [data, setData] = useState({ order_item: '', branch_id: '' })
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token)
        } else {
            navigate('/auth')
        }
        (async () => {
            const { data: { data } } = await axios.get('http://localhost:4100/api/star-bakery/v1/branch/');
            setBranches(data)
        })()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setData(d => ({ ...d, [name]: value }))
    }
    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:4100/api/star-bakery/v1/order/', data, { headers: { 'Accept': 'application/json', Authorization: `Bearer ${token}` } })
            if (res?.data?.data?.id) {
                window.alert('order created')
                navigate('/')
            }
        }
        catch (e) { }
        setLoading(false)
    }

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'grid', placeItems: 'center' }}>
            <form style={{ width: '400px', height: 'fit-content', padding: '50px 20px', background: '#fff', display: 'flex', flexFlow: 'column', gap: 20 }}>
                <div style={{ display: 'flex', flexFlow: 'column', gap: 10, }}>
                    <label style={{ fontWeight: 500, fontSize: '.9rem' }} htmlFor="order_item">Select Order Item</label>
                    <select id="order_item" style={{ height: 50, }} name="order_item" onChange={handleChange} value={data.order_item} >
                        <option selected value="">Select Order Item</option>
                        <option value="cake">Cake (500 Rs)</option>
                        <option value="muffins">Muffins (100 Rs)</option>
                        <option value="cookies">Cookies (50 Rs)</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexFlow: 'column', gap: 10, }}>
                    <label style={{ fontWeight: 500, fontSize: '.9rem' }} htmlFor="branch">Select Branch</label>
                    <select id="branch" style={{ height: 50, }} name="branch_id" onChange={handleChange} value={data.branch_id} >
                        <option selected value="">Select Branch</option>
                        {branches.map(branch => (<option value={branch._id}>{branch.name}</option>))}
                    </select>
                </div>
                {data.order_item && data.branch_id && <button onClick={handleSubmit} style={{ opacity: loading ? .3 : 1, height: 40, width: 200, margin: '10px auto', outline: 'none', border: 'none', background: '#5657ff', cursor: 'pointer', color: '#fff' }}>Order Now</button>}
            </form>
        </div>
    )
}

export default CreateOrder
