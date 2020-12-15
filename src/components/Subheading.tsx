import React from 'react'
import styled from 'styled-components'

const Container = styled.h2`
    font-size: 30px;
    font-weight: 500;
    color: ${(props) => props.theme.text};
    margin-bottom: 16px;
`

export const Subheading = ({children}: {children: string}) => {
    return <Container>{children}</Container>
}
