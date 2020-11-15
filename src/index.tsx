import React from 'react'
import ReactDOM from 'react-dom'
import {SWRConfig} from 'swr'
import App from './App'
import {fetcher} from './components/api'
import {DarkModeProvider} from './components/useDarkMode'

// if (process.env.NODE_ENV === 'development') {
//     const {worker} = require('./mocks/browser')
//     worker.start()
// }

ReactDOM.render(
    <React.StrictMode>
        <DarkModeProvider>
            <SWRConfig value={{fetcher}}>
                <App />
            </SWRConfig>
        </DarkModeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
