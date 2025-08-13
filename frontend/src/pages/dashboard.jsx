import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Balance from '../components/balance'

export default function Dashboard() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        
        if (!token || token === 'undefined' || token === 'null') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/signin')
            return
        }

        if (userData && userData !== 'undefined' && userData !== 'null') {
            try {
                const parsedUser = JSON.parse(userData)
                setUser(parsedUser)
            } catch (error) {
                console.error('Error parsing user data:', error)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate('/signin')
                return
            }
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/signin')
            return
        }
        
        setLoading(false)
    }, [navigate])

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-lg">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-lg">Redirecting to sign in...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            
            <div className="pt-20 px-4 max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-black to-gray-900 border-2 border-[#12b981] rounded-xl p-4 mb-4 shadow-2xl">
                    <div className="text-center">
                        <h1 className="text-2xl font-black text-white mb-1">Welcome Back!</h1>
                        <p className="text-[#12b981] text-sm font-semibold">{user.firstName} {user.lastName}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <Balance />
                </div>

                <div className="bg-gradient-to-r from-black to-gray-900 border-2 border-[#12b981] rounded-xl p-4 shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-lg font-black text-white mb-2">Quick Actions</h2>
                        <button 
                            onClick={() => navigate('/sendmoney')}
                            className="px-6 py-3 bg-[#12b981] text-white rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:-translate-y-1 hover:shadow-lg shadow-md flex items-center gap-2 mx-auto"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            Send Money
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}