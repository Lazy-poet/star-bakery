import { FC, ReactNode } from 'react'
import { useStyletron, styled } from 'baseui'
export const DashboardWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    const [css] = useStyletron()
    return <div className={css({
        width: 'calc(100vw - 100px)',
        height: 'fit-content',
        margin: '50px',
        color: '#ccc',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        // gridAutoRows: 0
    })}>
        {children}
    </div>
}
export const ColumnWrapper = styled('div', () => ({
    flex: 1,
    display: 'flex',
    justifyContent: 'start',
    flexFlow: 'column',
    gap: '20px',
    height: 'fit-content',
    width: 'fit-content'
}))