import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    font-size: 30px;
    font-weight: 500;
    color: ${(props) => props.theme.text};
    margin-bottom: 16px;
`

export const Subheading = ({children, testId}: {children: string; testId?: string}) => {
    return <Container data-testid={testId}>{children}</Container>
}
