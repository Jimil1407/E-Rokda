import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData && userData !== 'undefined' && userData !== 'null') {
            try {
                const parsedUser = JSON.parse(userData)
                setUser(parsedUser)
            } catch (error) {
                console.error('Error parsing user data:', error)
            }
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/signin')
    }

    return (
        <nav className="bg-black border-b-2 border-white px-4 sm:px-6 py-3 sm:py-4 fixed top-0 left-0 right-0 z-50 shadow-2xl">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-4 sm:gap-8">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight uppercase">E-ROKDA</h1>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="hidden sm:flex px-3 sm:px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-xl shadow-lg items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                        </svg>
                        Dashboard
                    </button>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-4">
                    <button 
                        onClick={() => navigate('/sendmoney')}
                        className="px-2 sm:px-4 py-2 rounded-lg bg-[#12b981] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:-translate-y-1 hover:shadow-xl shadow-lg flex items-center gap-1 sm:gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span className="hidden sm:inline">Send Money</span>
                    </button>
                    <button 
                        onClick={() => navigate('/profile')}
                        className="px-2 sm:px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-xl shadow-lg flex items-center gap-1 sm:gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="hidden sm:inline">{user?.firstName || 'Profile'}</span>
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="px-2 sm:px-4 py-2 rounded-lg bg-red-600 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:bg-red-700 hover:-translate-y-1 hover:shadow-xl shadow-lg flex items-center gap-1 sm:gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}