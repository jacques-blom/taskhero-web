import React from 'react'
import ReactDOM from 'react-dom'
import {ToastContainer} from 'react-toastify'
import {SWRConfig} from 'swr'
import App from './App'
import {fetcher} from './components/api'
import {DarkModeProvider} from './components/useDarkMode'
import {UserIdProvider} from './components/useUserId'
import 'react-toastify/dist/ReactToastify.css'

// if (process.env.NODE_ENV === 'development') {
//     const {worker} = require('./mocks/browser')
//     worker.start()
// }

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
