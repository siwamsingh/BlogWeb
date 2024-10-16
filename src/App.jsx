import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }))
                } else {
                    dispatch(logout())
                }
            })
            .finally(() => setLoading(false))
    }, [])

    return !loading ? (
        <div className='min-h-screen flex min-w-[300px] flex-wrap content-between bg-slate-200 dark:bg-slate-800'>
            <div className='w-full block'>
                <Header />
                <main className=''>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : null
}

export default App