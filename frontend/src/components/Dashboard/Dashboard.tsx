import React from 'react'
import { DashboardWrapper, ColumnWrapper } from './Dashboard.style'
import Section from './Section/Section'
import LineChart from '../Charts/Orders/OrderLineChart'
import OrderTypeChart from '../Charts/Orders/OrderTypeChart'
import OrderStateChart from '../Charts/Orders/OrderStateChart'
import BranchesChart from '../Charts/Branches/BranchesChart'
import TimeSelector from 'components/TimeSelector/TimeSelector'
type Props = {}

const Dashboard = (props: Props) => {
    return (
        <DashboardWrapper>
            <ColumnWrapper>
                <Section title="Orders">
                    <LineChart /></Section>
                <Section title="Order type"> <OrderTypeChart /> </Section>
            </ColumnWrapper>
            <ColumnWrapper>
                <Section title="Order State"><OrderStateChart /></Section>
                <Section title="Branches"><BranchesChart /></Section>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          `
            </ColumnWrapper>
        </DashboardWrapper>
    )
}

export default Dashboard