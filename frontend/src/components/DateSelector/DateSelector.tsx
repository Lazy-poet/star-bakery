import React, { useEffect } from 'react'
import { StatefulDatepicker } from "baseui/datepicker";
import { toggleCustomDate } from 'store/customDateSlice'
import useCustomDispatch from 'hooks/useCustomDispatch'
import useCustomSelector from 'hooks/useCustomSelector'

type Props = {}

const DateSelector = (props: Props) => {

    const dispatch = useCustomDispatch();
    const dateRange = useCustomSelector(state => state.customDate.date)

    useEffect(() => {
        console.log('dispatched')
        dispatch(toggleCustomDate([new Date(Date.now()), new Date()]))
    }, [])
    return (
        <div style={{ maxWidth: 'max-content', background: '#fff', padding: 20 }}>
            <StatefulDatepicker
                aria-label="Select a Time Range"
                clearable={true}
                value={dateRange}
                initialState={{ value: dateRange }}
                range
                separateRangeInputs
                onChange={({ date }) => {
                    if(Array.isArray(date) && date.length === 2){
                        dispatch(toggleCustomDate(date as [Date, Date]))
                    }
                }}
                positive
                timeSelectStart
                timeSelectEnd
            />


        </div>
    )
}

export default DateSelector