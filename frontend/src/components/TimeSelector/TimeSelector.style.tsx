import { FC } from "react"

export const TimeItem: FC<{ label: string; onClick: () => void; selected: boolean; custom: boolean }> = ({ label, onClick, selected, custom }) => {
    return <span onClick={onClick} style={{
        display: 'grid',
        placeContent: 'center',
        cursor: 'pointer',
        fontSize: 14,
        ...(custom ? {
            color: selected ? "#5657ff" : '#666',
            fontWeight: selected ? 'bold' : 300
        }: {
            width: 40,
            height: 40,
            color: selected ? "#fff" : '#666',
            background: selected ?  '#5657ff' : '#F2F7FF',
            borderRadius: '50%'
        }),
      
    }}>{label}</span>
}