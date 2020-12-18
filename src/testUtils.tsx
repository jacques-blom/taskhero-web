import React from 'react'
import {ToastContainer} from 'react-toastify'
import {SWRConfig} from 'swr'
import {fetcher} from './components/api'
import {DarkModeProvider} from './components/useDarkMode'
import {UserIdProvider} from './components/useUserId'

export const GlobalWrapper: React.FC = ({children}) => {
    return (
        <DarkModeProvider>
            <UserIdProvider>
                <SWRConfig value={{fetcher: fetcher, shouldRetryOnError: false}}>
                    {children}
                    <ToastContainer />
                </SWRConfig>
            </UserIdProvider>
        </DarkModeProvider>
    )
}
