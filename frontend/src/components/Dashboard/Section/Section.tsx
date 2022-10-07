import { ReactNode } from 'react'
import { SectionWrapper } from './Section.style'

type Props = {
    children?: ReactNode,
    title?: string
}

const Section = ({ children, title="Section" }: Props) => {
    return (
        <SectionWrapper title={title}>
            {children}
        </SectionWrapper>
    )
}

export default Section