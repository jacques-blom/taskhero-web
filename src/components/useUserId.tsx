import React, {createContext, useContext, useEffect, useState} from 'react'
import {v4} from 'uuid'

const getUserId = () => {
    try {
        return localStorage.getItem('userId')
    } catch (e) {
        return null
    }
}

const UserIdContext = createContext<string | null | undefined>(undefined)

export const UserIdProvider: React.FC = ({children}) => {
    const [userId, setUserId] = useState(getUserId)

    useEffect(() => {
        if (!userId) {
            const newUserId = v4()
            setUserId(newUserId)
            localStorage.setItem('userId', newUserId)
        }
    }, [userId])

    return <UserIdContext.Provider value={userId}>{children}</UserIdContext.Provider>
}

export const useUserId = () => {
    const userId = useContext(UserIdContext)
    if (userId === undefined) throw new Error('Cannot use userId outside of <UserIdProvider />')

    return userId
}
