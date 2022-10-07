import React from 'react'
import { TimeItem } from './TimeSelector.style'
import DateSelector from '../DateSelector/DateSelector'
import { Range, toggleRange } from 'store/timeRangeSlice'
import { setIsCustom } from 'store/customDateSlice'
import useCustomDispatch from 'hooks/useCustomDispatch'
import useCustomSelector from 'hooks/useCustomSelector'

type Props = {}

const times = [{ label: '1H', type: Range.HOURLY },
{ label: '1D', type: Range.DAILY },
{ label: '1W', type: Range.WEEKLY },
{ label: '1M', type: Range.MONTHLY },
{ label: '1Y', type: Range.YEARLY },
{ label: 'Custom', type: Range.CUSTOM }
]

const TimeSelector = (props: Props) => {
    const dispatch = useCustomDispatch();
    const timeRange = useCustomSelector(state => state.timeRange)
    const isCustom = useCustomSelector(state => state.customDate.custom)
    return (
        <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', margin: '50px', height: 'fit-content', gap: 20 }}>
            <div style={{ padding: 20, boxShadow: '0 2px 5px rgba(0, 0, 0, .1)', borderRadius: 5, background: '#fff', width: 'fit-content', display: 'flex', gap: 20, alignItems: 'center' }}>
                <span style={{ color: '#000', fontWeight: 500 }}>Time Rollup:</span>
                {times.map(time => <TimeItem custom={time.type === Range.CUSTOM} selected={time.type === Range.CUSTOM ? isCustom : timeRange.range === time.type} label={time.label} onClick={() => {
                    if (time.type === Range.CUSTOM) {
                        dispatch(setIsCustom(true))

                    }
                    else {
                        dispatch(toggleRange(time.type))
                        dispatch(setIsCustom(false))

                    }
                }} />)}

            </div>
            {isCustom && <DateSelector />}
        </div>
    )
}

export default TimeSelector