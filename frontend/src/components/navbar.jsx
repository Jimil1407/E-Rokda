import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Clear any stored tokens/user data
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/signin')
    }

    return (
        <nav className="bg-black border-b-2 border-white px-6 py-4 fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-black text-white tracking-tight uppercase">E-ROKDA</h1>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5"
                    >
                        Dashboard
                    </button>
                </div>
                
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/sendmoney')}
                        className="px-4 py-2 rounded-lg bg-[#12b981] text-white font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:-translate-y-0.5"
                    >
                        Send Money
                    </button>
                    <button 
                        onClick={() => navigate('/profile')}
                        className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5"
                    >
                        Profile
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-red-700 hover:-translate-y-0.5"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}