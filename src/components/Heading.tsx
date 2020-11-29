import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Playfair Display', serif;
    font-size: 47px;
    font-weight: 600;
    letter-spacing: 2px;
    color: ${(props) => props.theme.text};

    > img {
        margin-right: 10px;
    }
`

export const Heading: React.FC = () => {
    return (
        <Container>
            <img src="/logo.png" style={{height: 47}} alt="Taskhero logo" />
            Taskhero
        </Container>
    )
}
