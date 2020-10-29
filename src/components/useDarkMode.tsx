import React, {useContext, useState} from 'react'

type Context = [boolean, (v: boolean) => void]

const DarkModeContext = React.createContext<Context | null>(null)

export const DarkModeProvider: React.FC = ({children}) => {
    const state = useState(true)

    return (
        <DarkModeContext.Provider value={state}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useDarkMode = () => {
    const context = useContext(DarkModeContext)
    if (!context) throw new Error('useDarkMode used outside of DarkModeContext')
    return context
}
