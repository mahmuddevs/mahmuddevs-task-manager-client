import React from 'react'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'
import { Navigate } from 'react-router-dom'

const PrivateAlt = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <Spinner />
    }

    if (!user) {
        return children
    }

    return <Navigate to='/' />
}

export default PrivateAlt