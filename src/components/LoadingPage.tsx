import React from 'react'
import styled, {useTheme} from 'styled-components'
import Spinner from 'react-spinner-material'

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`

export const LoadingPage: React.FC = () => {
    const theme = useTheme()

    return (
        <Container aria-live="polite" role="alert" aria-label="loading">
            <Spinner radius={45} color={theme.text} stroke={4} visible />
        </Container>
    )
}
