import React from 'react'
import ReactDOM from 'react-dom'
import {ToastContainer} from 'react-toastify'
import {SWRConfig} from 'swr'
import App from './App'
import {fetcher} from './components/api'
import {DarkModeProvider} from './components/useDarkMode'
import {UserIdProvider} from './components/useUserId'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
    <React.StrictMode>
        <DarkModeProvider>
            <SWRConfig value={{fetcher}}>
                <UserIdProvider>
                    <App />
                    <ToastContainer />
                </UserIdProvider>
            </SWRConfig>
        </DarkModeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
