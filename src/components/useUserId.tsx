import {useEffect, useState} from 'react'
import {v4} from 'uuid'

const getUserId = () => {
    try {
        return localStorage.getItem('userId')
    } catch (e) {
        return null
    }
}

export const useUserId = () => {
    const [userId, setUserId] = useState(getUserId)

    useEffect(() => {
        if (!userId) {
            const newUserId = v4()
            setUserId(newUserId)
            localStorage.setItem('userId', newUserId)
        }
    }, [userId])

    return userId
}
