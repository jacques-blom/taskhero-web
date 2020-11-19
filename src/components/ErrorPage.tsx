import React from 'react'
import {Page} from './Page'
import {Subheading} from './Subheading'

export const ErrorPage = ({message}: {message: string}) => {
    return (
        <Page testId="error">
            <Subheading>Error</Subheading>
            <div data-testid="errorMessage">{message}</div>
        </Page>
    )
}
