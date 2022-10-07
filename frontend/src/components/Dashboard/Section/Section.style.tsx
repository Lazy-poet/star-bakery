import { FC, ReactNode } from 'react';

export const SectionWrapper: FC<{ children: ReactNode, title?: string }> = ({ children, title }) => {
    return <div
        style={{
            background: "#fff",
            height: 'fit-content',
            minHeight: 400,
            minWidth: '400px',
            padding: 20,
            paddingTop: 0,
            flex: 1,
            gridRowEnd: 'auto',
            borderRadius: 7,
            boxShadow: '-3px 0 10px rgba(0, 0, 0, .1), 4px 4px 10px rgba(0, 0, 0, .1) '
        }}
    >
        <div style={{ color: 'rgba(0, 0, 0, .7)', fontWeight: 500, fontSize: '1.1rem', borderBottom: '1px solid #888', padding: '20px 0', display: 'flex', alignItems: 'center' }}>{title}</div>


        {children}</div>
}