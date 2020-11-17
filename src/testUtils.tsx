import React from 'react'
import {SWRConfig} from 'swr'
import {fetcher} from './components/api'
import {DarkModeProvider} from './components/useDarkMode'
import {UserIdProvider} from './components/useUserId'

export const GlobalWrapper: React.FC = ({children}) => {
    return (
        <DarkModeProvider>
            <UserIdProvider>
                <SWRConfig value={{dedupingInterval: 0, fetcher: fetcher, shouldRetryOnError: false}}>
                    {children}
                </SWRConfig>
            </UserIdProvider>
        </DarkModeProvider>
    )
}