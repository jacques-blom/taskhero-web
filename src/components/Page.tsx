import React from 'react'
import styled from 'styled-components'
import {Header} from './Header'

const PageContainer = styled.div`
    width: 100%;
    max-width: 560px;
    padding: 20px;
    box-sizing: border-box;
    margin: 0 auto;
`

export const Page: React.FC<{testId?: string}> = ({children, testId}) => {
    return (
        <PageContainer data-testid={testId}>
            <Header />
            {children}
        </PageContainer>
    )
}
